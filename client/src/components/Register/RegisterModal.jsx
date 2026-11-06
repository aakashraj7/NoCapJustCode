// client/src/components/Register/RegisterModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './Register.module.css';
import { registrationSchema } from './registrationSchema.js';
import { registerParticipant } from '../../services/api.js';
import { startPayment } from '../../services/payment.js';
import { PRICING, PAYMENT_NOTE } from '../../data/event.js';
import Button from '../ui/Button.jsx';

export default function RegisterModal({ isOpen, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [registrationResult, setRegistrationResult] = useState(null);

  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      pairName: '',
      members: [
        { fullName: '', email: '', phone: '', college: '', department: '', year: '1' },
        { fullName: '', email: '', phone: '', college: '', department: '', year: '1' },
      ],
    },
    mode: 'onBlur',
  });

  // Exactly 2 members (fixed, non-removable)
  const { fields } = useFieldArray({
    control,
    name: 'members',
  });

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
      const payload = {
        pairName: formData.pairName ? formData.pairName.trim() : null,
        members: formData.members.map((m) => ({
          fullName: m.fullName.trim(),
          email: m.email.trim(),
          phone: m.phone.trim(),
          college: m.college.trim(),
          department: m.department.trim(),
          year: m.year,
        })),
      };

      // Step 1: Submit pair registration to API (or mock adapter)
      const result = await registerParticipant(payload);

      // Step 2: Payment seam stub (Razorpay integration point for teammate)
      await startPayment(result.registration);

      // Step 3: Registration received success state
      setRegistrationResult(result.registration);
    } catch (err) {
      // Truthful error message: preserve inputs on error
      setServerError(
        `Server flinched: ${err.message || 'Network error'}. Don't worry, your details are still here, try again.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setServerError(null);
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
            <span className={styles.modalTag}>// PAIR REGISTRATION</span>
            <h2 id="modal-title" className={styles.modalTitle}>
              {registrationResult ? 'Registration Received' : 'Register as a Pair'}
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
            <h3 className={styles.successTitle}>Registration Received</h3>
            <div className={styles.successTagline}>Your spot has been queued for LARPER OR CODER.</div>

            <div className={styles.registrationCard}>
              <span className={styles.regIdLabel}>REGISTRATION ID</span>
              <span className={styles.regIdValue}>{registrationResult.id}</span>
              {registrationResult.pairName && (
                <span className={styles.regSubtext}>Pair: {registrationResult.pairName}</span>
              )}
              <span className={styles.regSubtext}>
                Format: Pair (2 coders) // Both tracks included (The Training Arc & TLE)
              </span>
              <span className={styles.regFeeSubtext}>
                Total Registration Fee: ₹{PRICING.pair} (₹{PRICING.perHead} × 2)
              </span>
            </div>

            {/* PAYMENT NOTE Line */}
            <div className={styles.paymentNoteBlock}>
              <span className={styles.paymentNoteIcon}>ℹ️</span>
              <span className={styles.paymentNoteText}>{PAYMENT_NOTE}</span>
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

              {/* Pricing & Coverage Summary Banner */}
              <div className={styles.pricingSummaryCard}>
                <div className={styles.pricingLeft}>
                  <div className={styles.pricingFormula}>
                    2 people × ₹{PRICING.perHead} = <span className={styles.pricingTotal}>₹{PRICING.pair}</span>
                  </div>
                  <div className={styles.pricingCoverage}>
                    Includes The Training Arc and TLE
                  </div>
                </div>
                <div className={styles.pricingPill}>
                  ONE PASS COVERS ALL
                </div>
              </div>

              {/* Optional Pair Name */}
              <div className={styles.formGroup}>
                <label htmlFor="reg-pairname" className={styles.fieldLabel}>
                  Pair Name <span className={styles.optionalBadge}>(Optional)</span>
                </label>
                <input
                  id="reg-pairname"
                  type="text"
                  placeholder="e.g. ByteForce"
                  className={`${styles.inputField} ${errors.pairName ? styles.hasError : ''}`}
                  {...register('pairName')}
                />
                {errors.pairName && (
                  <span className={styles.errorMessage}>{errors.pairName.message}</span>
                )}
              </div>

              {/* Two-Column Member Layout on Laptop / Stacked on Mobile */}
              <div className={styles.membersColumnsGrid}>
                {fields.map((field, index) => {
                  const memberNum = index + 1;
                  const memberErrors = errors.members?.[index];

                  return (
                    <div key={field.id} className={styles.memberCard}>
                      <div className={styles.memberCardHeader}>
                        <span>MEMBER #{memberNum} {memberNum === 1 ? '(PRIMARY CONTACT)' : ''}</span>
                      </div>

                      <div className={styles.memberFieldsGrid}>
                        {/* Full Name */}
                        <div className={styles.formGroup}>
                          <label htmlFor={`member-${index}-name`} className={styles.fieldLabelSmall}>
                            Full Name
                          </label>
                          <input
                            id={`member-${index}-name`}
                            type="text"
                            placeholder="e.g. Jane Doe"
                            className={`${styles.inputField} ${memberErrors?.fullName ? styles.hasError : ''}`}
                            {...register(`members.${index}.fullName`)}
                          />
                          {memberErrors?.fullName && (
                            <span className={styles.errorMessage}>
                              {memberErrors.fullName.message}
                            </span>
                          )}
                        </div>

                        {/* Email */}
                        <div className={styles.formGroup}>
                          <label htmlFor={`member-${index}-email`} className={styles.fieldLabelSmall}>
                            Email Address
                          </label>
                          <input
                            id={`member-${index}-email`}
                            type="email"
                            placeholder="e.g. jane@example.com"
                            className={`${styles.inputField} ${memberErrors?.email ? styles.hasError : ''}`}
                            {...register(`members.${index}.email`)}
                          />
                          {memberErrors?.email && (
                            <span className={styles.errorMessage}>
                              {memberErrors.email.message}
                            </span>
                          )}
                        </div>

                        {/* Phone */}
                        <div className={styles.formGroup}>
                          <label htmlFor={`member-${index}-phone`} className={styles.fieldLabelSmall}>
                            Phone (10 Digits)
                          </label>
                          <input
                            id={`member-${index}-phone`}
                            type="tel"
                            placeholder="e.g. 9876543210"
                            className={`${styles.inputField} ${memberErrors?.phone ? styles.hasError : ''}`}
                            {...register(`members.${index}.phone`)}
                          />
                          {memberErrors?.phone && (
                            <span className={styles.errorMessage}>
                              {memberErrors.phone.message}
                            </span>
                          )}
                        </div>

                        {/* Year */}
                        <div className={styles.formGroup}>
                          <label htmlFor={`member-${index}-year`} className={styles.fieldLabelSmall}>
                            Year of Study
                          </label>
                          <select
                            id={`member-${index}-year`}
                            className={`${styles.selectField} ${memberErrors?.year ? styles.hasError : ''}`}
                            {...register(`members.${index}.year`)}
                          >
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                          </select>
                          {memberErrors?.year && (
                            <span className={styles.errorMessage}>
                              {memberErrors.year.message}
                            </span>
                          )}
                        </div>

                        {/* College */}
                        <div className={styles.formGroup}>
                          <label htmlFor={`member-${index}-college`} className={styles.fieldLabelSmall}>
                            College Name
                          </label>
                          <input
                            id={`member-${index}-college`}
                            type="text"
                            placeholder="e.g. SJIT"
                            className={`${styles.inputField} ${memberErrors?.college ? styles.hasError : ''}`}
                            {...register(`members.${index}.college`)}
                          />
                          {memberErrors?.college && (
                            <span className={styles.errorMessage}>
                              {memberErrors.college.message}
                            </span>
                          )}
                        </div>

                        {/* Department */}
                        <div className={styles.formGroup}>
                          <label htmlFor={`member-${index}-dept`} className={styles.fieldLabelSmall}>
                            Department
                          </label>
                          <input
                            id={`member-${index}-dept`}
                            type="text"
                            placeholder="e.g. CSE / IT"
                            className={`${styles.inputField} ${memberErrors?.department ? styles.hasError : ''}`}
                            {...register(`members.${index}.department`)}
                          />
                          {memberErrors?.department && (
                            <span className={styles.errorMessage}>
                              {memberErrors.department.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
                {submitting ? 'Registering pair...' : `Register as a pair - ₹${PRICING.pair}`}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
