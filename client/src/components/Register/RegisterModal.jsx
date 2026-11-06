// client/src/components/Register/RegisterModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './Register.module.css';
import { registrationSchema } from './registrationSchema.js';
import { registerParticipant } from '../../services/api.js';
import { startPayment } from '../../services/payment.js';
import Button from '../ui/Button.jsx';

export default function RegisterModal({ isOpen, onClose, defaultEventId = 'training-arc' }) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [registrationResult, setRegistrationResult] = useState(null);

  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  const initialEvent = defaultEventId === 'tle' ? 'tle' : 'training-arc';

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      event: initialEvent,
      fullName: '',
      email: '',
      phone: '',
      college: '',
      department: '',
      year: '1',
      teamName: '',
      teamSize: 2,
      members: [{ fullName: '', email: '', phone: '' }],
    },
    mode: 'onBlur',
  });

  const selectedEvent = watch('event');
  const selectedTeamSize = watch('teamSize') || 2;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  // Keep dynamic team members array aligned with teamSize (teamSize - 1 additional members)
  useEffect(() => {
    if (selectedEvent === 'tle') {
      const requiredCount = Math.max(1, Number(selectedTeamSize) - 1);
      const currentCount = fields.length;

      if (currentCount < requiredCount) {
        for (let i = currentCount; i < requiredCount; i++) {
          append({ fullName: '', email: '', phone: '' });
        }
      } else if (currentCount > requiredCount) {
        for (let i = currentCount - 1; i >= requiredCount; i--) {
          remove(i);
        }
      }
    }
  }, [selectedEvent, selectedTeamSize, fields.length, append, remove]);

  // Sync defaultEventId when opening
  useEffect(() => {
    if (isOpen) {
      const target = defaultEventId === 'tle' ? 'tle' : 'training-arc';
      setValue('event', target);
      setServerError(null);
      setRegistrationResult(null);
    }
  }, [isOpen, defaultEventId, setValue]);

  // Lock body scroll and focus close button on open
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('scroll-locked');
    closeBtnRef.current?.focus();

    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [isOpen]);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !submitting) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, submitting, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    setServerError(null);

    try {
      // Build normalized payload for API/Contract
      const payload = {
        event: formData.event,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        department: formData.department,
        year: formData.year,
      };

      if (formData.event === 'tle') {
        payload.teamDetails = {
          teamName: formData.teamName,
          teamSize: Number(formData.teamSize),
          members: formData.members,
        };
      }

      // Step 1: Submit registration to API
      const result = await registerParticipant(payload);

      // Step 2: Payment seam stub (Razorpay integration point for teammate)
      await startPayment(result.registration);

      // Step 3: Success state
      setRegistrationResult(result.registration);
    } catch (err) {
      // Truthful error message: tell user data is still in memory
      setServerError(
        `Server flinched: ${err.message || 'Network error'}. Don't worry, your details are still here, try again.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (registrationResult) {
      reset();
      setRegistrationResult(null);
    }
    onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) handleModalClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} ref={modalRef}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <span className={styles.modalTag}>// EVENT REGISTRATION</span>
            <h2 id="modal-title" className={styles.modalTitle}>
              {registrationResult ? 'Registration Confirmed' : 'Lock In Your Spot'}
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeButton}
            onClick={handleModalClose}
            aria-label="Close registration modal"
            disabled={submitting}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content: Success View or Form */}
        {registrationResult ? (
          <div className={styles.successBody}>
            <div className={styles.successIconWrapper}>✓</div>
            <h3 className={styles.successTitle}>You&apos;re locked in.</h3>
            <div className={styles.successTagline}>no larping now. see you on the battlefield.</div>

            <div className={styles.registrationCard}>
              <span className={styles.regIdLabel}>REGISTRATION ID</span>
              <span className={styles.regIdValue}>{registrationResult.id}</span>
              <span className={styles.regSubtext}>
                Track: {registrationResult.event === 'tle' ? 'TLE: Think, Lock In, Execute' : 'The Training Arc'}
              </span>
              {registrationResult.teamName && (
                <span className={styles.regSubtext}>Team: {registrationResult.teamName}</span>
              )}
            </div>

            <Button size="md" variant="primary" onClick={handleModalClose}>
              Done & Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.formBody}>
              {/* Error banner if submission failed */}
              {serverError && (
                <div className={styles.errorBanner} role="alert">
                  <span className={styles.errorIcon}>⚠️</span>
                  <span>{serverError}</span>
                </div>
              )}

              {/* Event Track Radio Selector */}
              <div className={styles.eventSelector}>
                <span className={styles.fieldLabel}>Select Track</span>
                <div className={styles.radioCardsGrid}>
                  <div
                    className={`${styles.radioCard} ${selectedEvent === 'training-arc' ? styles.selected : ''}`}
                    onClick={() => setValue('event', 'training-arc')}
                  >
                    <div className={styles.radioIndicator}>
                      {selectedEvent === 'training-arc' && <div className={styles.radioIndicatorDot} />}
                    </div>
                    <div className={styles.radioContent}>
                      <span className={styles.radioName}>The Training Arc</span>
                      <span className={styles.radioDesc}>Workshop // Individual entry</span>
                    </div>
                  </div>

                  <div
                    className={`${styles.radioCard} ${selectedEvent === 'tle' ? styles.selected : ''}`}
                    onClick={() => setValue('event', 'tle')}
                  >
                    <div className={styles.radioIndicator}>
                      {selectedEvent === 'tle' && <div className={styles.radioIndicatorDot} />}
                    </div>
                    <div className={styles.radioContent}>
                      <span className={styles.radioName}>TLE (DEADLOCK)</span>
                      <span className={styles.radioDesc}>Competition // Team of 2 to 4</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Applicant Fields */}
              <div className={styles.fieldsGrid}>
                {/* Full Name */}
                <div className={styles.formGroup}>
                  <label htmlFor="reg-fullname" className={styles.fieldLabel}>
                    Full Name {selectedEvent === 'tle' && '(Team Lead)'}
                  </label>
                  <input
                    id="reg-fullname"
                    type="text"
                    placeholder="e.g. Jane Doe"
                    className={`${styles.inputField} ${errors.fullName ? styles.hasError : ''}`}
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <span className={styles.errorMessage}>{errors.fullName.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                  <label htmlFor="reg-email" className={styles.fieldLabel}>
                    Email Address
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="e.g. jane@example.com"
                    className={`${styles.inputField} ${errors.email ? styles.hasError : ''}`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className={styles.errorMessage}>{errors.email.message}</span>
                  )}
                </div>

                {/* Phone */}
                <div className={styles.formGroup}>
                  <label htmlFor="reg-phone" className={styles.fieldLabel}>
                    Phone Number (10 Digits)
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    className={`${styles.inputField} ${errors.phone ? styles.hasError : ''}`}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <span className={styles.errorMessage}>{errors.phone.message}</span>
                  )}
                </div>

                {/* Year */}
                <div className={styles.formGroup}>
                  <label htmlFor="reg-year" className={styles.fieldLabel}>
                    Year of Study
                  </label>
                  <select
                    id="reg-year"
                    className={`${styles.selectField} ${errors.year ? styles.hasError : ''}`}
                    {...register('year')}
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                  {errors.year && (
                    <span className={styles.errorMessage}>{errors.year.message}</span>
                  )}
                </div>

                {/* College */}
                <div className={styles.formGroup}>
                  <label htmlFor="reg-college" className={styles.fieldLabel}>
                    College Name
                  </label>
                  <input
                    id="reg-college"
                    type="text"
                    placeholder="e.g. SJIT"
                    className={`${styles.inputField} ${errors.college ? styles.hasError : ''}`}
                    {...register('college')}
                  />
                  {errors.college && (
                    <span className={styles.errorMessage}>{errors.college.message}</span>
                  )}
                </div>

                {/* Department */}
                <div className={styles.formGroup}>
                  <label htmlFor="reg-department" className={styles.fieldLabel}>
                    Department
                  </label>
                  <input
                    id="reg-department"
                    type="text"
                    placeholder="e.g. CSE / IT"
                    className={`${styles.inputField} ${errors.department ? styles.hasError : ''}`}
                    {...register('department')}
                  />
                  {errors.department && (
                    <span className={styles.errorMessage}>{errors.department.message}</span>
                  )}
                </div>
              </div>

              {/* TLE Team Details Section */}
              {selectedEvent === 'tle' && (
                <div className={styles.teamSection}>
                  <div className={styles.teamHeader}>
                    <span className={styles.teamHeading}>// TEAM SPECIFICATIONS</span>
                  </div>

                  <div className={styles.fieldsGrid}>
                    {/* Team Name */}
                    <div className={styles.formGroup}>
                      <label htmlFor="reg-teamname" className={styles.fieldLabel}>
                        Team Name
                      </label>
                      <input
                        id="reg-teamname"
                        type="text"
                        placeholder="e.g. ByteForce"
                        className={`${styles.inputField} ${errors.teamName ? styles.hasError : ''}`}
                        {...register('teamName')}
                      />
                      {errors.teamName && (
                        <span className={styles.errorMessage}>{errors.teamName.message}</span>
                      )}
                    </div>

                    {/* Team Size */}
                    <div className={styles.formGroup}>
                      <label htmlFor="reg-teamsize" className={styles.fieldLabel}>
                        Total Team Size (2 to 4)
                      </label>
                      <select
                        id="reg-teamsize"
                        className={styles.selectField}
                        {...register('teamSize')}
                      >
                        <option value="2">2 Members (Lead + 1)</option>
                        <option value="3">3 Members (Lead + 2)</option>
                        <option value="4">4 Members (Lead + 3)</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Additional Team Members */}
                  <div className={styles.membersList}>
                    {fields.map((field, index) => {
                      const memberNum = index + 2;
                      const memberErrors = errors.members?.[index];

                      return (
                        <div key={field.id} className={styles.memberCard}>
                          <span className={styles.memberTitle}>Member #{memberNum} Details</span>
                          <div className={styles.fieldsGrid}>
                            <div className={styles.formGroup}>
                              <input
                                type="text"
                                placeholder={`Member #${memberNum} Full Name`}
                                className={`${styles.inputField} ${memberErrors?.fullName ? styles.hasError : ''}`}
                                {...register(`members.${index}.fullName`)}
                              />
                              {memberErrors?.fullName && (
                                <span className={styles.errorMessage}>
                                  {memberErrors.fullName.message}
                                </span>
                              )}
                            </div>

                            <div className={styles.formGroup}>
                              <input
                                type="email"
                                placeholder={`Member #${memberNum} Email`}
                                className={`${styles.inputField} ${memberErrors?.email ? styles.hasError : ''}`}
                                {...register(`members.${index}.email`)}
                              />
                              {memberErrors?.email && (
                                <span className={styles.errorMessage}>
                                  {memberErrors.email.message}
                                </span>
                              )}
                            </div>

                            <div className={`${styles.formGroup} ${styles.fullCol}`}>
                              <input
                                type="tel"
                                placeholder={`Member #${memberNum} Phone (10 Digits)`}
                                className={`${styles.inputField} ${memberErrors?.phone ? styles.hasError : ''}`}
                                {...register(`members.${index}.phone`)}
                              />
                              {memberErrors?.phone && (
                                <span className={styles.errorMessage}>
                                  {memberErrors.phone.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className={styles.modalFooter}>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={handleModalClose}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={submitting}
              >
                {submitting ? 'locking you in...' : 'Complete Registration'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
