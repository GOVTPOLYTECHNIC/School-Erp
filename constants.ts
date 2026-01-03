
import { InstitutionType, InstitutionDetails } from './types';

export const INSTITUTIONS: Record<InstitutionType, InstitutionDetails> = {
  [InstitutionType.POLYTECHNIC]: {
    id: InstitutionType.POLYTECHNIC,
    name: 'Rajiv Gandhi Polytechnic',
    semesters: 6,
    annualFee: 20000,
    color: 'blue',
    branches: ['Civil Engg', 'Mechanical Engg', 'Electrical Engg']
  },
  [InstitutionType.ITI]: {
    id: InstitutionType.ITI,
    name: 'Rajiv Gandhi ITI',
    semesters: 4,
    annualFee: 15000,
    color: 'emerald',
    branches: ['Fitter', 'Electrician', 'Welder']
  },
  [InstitutionType.GSS]: {
    id: InstitutionType.GSS,
    name: 'Gramodyog Sewa Sansthan',
    semesters: 4,
    annualFee: 40000,
    color: 'orange',
    branches: ['Diploma in Special Education MR']
  }
};

export const INITIAL_STUDENTS = [
  {
    id: 'STU001',
    admissionNo: 'GSS/2024/001',
    rollNumber: '7888',
    name: 'Rahul Kumar',
    fatherName: 'Suresh Singh',
    dob: '2005-05-15',
    mobileNumber: '8798954163',
    address: 'Varanasi, Uttar Pradesh',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
    institution: InstitutionType.POLYTECHNIC,
    branch: 'Civil Engg',
    enrollmentDate: '2023-07-10',
    currentSemester: 1,
    totalFeesPaid: 5000
  },
  {
    id: 'STU002',
    admissionNo: 'GSS/2024/002',
    rollNumber: '7889',
    name: 'Priya Sharma',
    fatherName: 'Amit Sharma',
    dob: '2004-12-20',
    mobileNumber: '9988776655',
    address: 'Lucknow, Uttar Pradesh',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    institution: InstitutionType.ITI,
    branch: 'Electrician',
    enrollmentDate: '2023-08-01',
    currentSemester: 1,
    totalFeesPaid: 15000
  }
];
