// client/src/data/workshopPhotos.js
import w1 from '../assets/workshop/workshop-1.webp';
import w1_700 from '../assets/workshop/workshop-1-700w.webp';
import w2 from '../assets/workshop/workshop-2.webp';
import w2_700 from '../assets/workshop/workshop-2-700w.webp';
import w3 from '../assets/workshop/workshop-3.webp';
import w3_700 from '../assets/workshop/workshop-3-700w.webp';
import w4 from '../assets/workshop/workshop-4.webp';
import w4_700 from '../assets/workshop/workshop-4-700w.webp';

export const workshopPhotos = [
  {
    id: 1,
    src: w1,
    srcset: `${w1_700} 700w, ${w1} 1024w`,
    width: 1024,
    height: 569,
    aspectRatio: '1024 / 569',
    alt: 'Instructor explaining algorithmic self-attention mechanism on projection board to students in classroom',
    caption: 'Algorithmic deep dives & intuitive problem solving',
  },
  {
    id: 2,
    src: w2,
    srcset: `${w2_700} 526w, ${w2} 526w`,
    width: 526,
    height: 682,
    aspectRatio: '526 / 682',
    alt: 'Two students pair-programming and reviewing code together on a laptop in the lab',
    caption: 'Pairs locked in code and real-time debugging',
  },
  {
    id: 3,
    src: w3,
    srcset: `${w3_700} 700w, ${w3} 1024w`,
    width: 1024,
    height: 483,
    aspectRatio: '1024 / 483',
    alt: 'Students seated at computer workstations attentively following a coding workshop session',
    caption: 'Full-focus lab sessions with active participation',
  },
  {
    id: 4,
    src: w4,
    srcset: `${w4_700} 700w, ${w4} 961w`,
    width: 961,
    height: 622,
    aspectRatio: '961 / 622',
    alt: 'Organizers and participants interacting across computer lab rows during an active workshop',
    caption: 'Live mentorship and on-the-spot code guidance',
  },
];
