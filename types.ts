
export enum InstitutionType {
  POLYTECHNIC = 'Rajiv Gandhi Polytechnic',
  ITI = 'Rajiv Gandhi ITI',
  GSS = 'Gramodyog Sewa Sansthan'
}

export interface InstitutionDetails {
  id: InstitutionType;
  name: string;
  semesters: number;
  annualFee: number;
  color: string;
  branches: string[];
}

export interface Student {
  id: string;
  admissionNo: string;
  rollNumber: string;
  name: string;
  fatherName: string;
  dob: string;
  mobileNumber: string;
  address: string;
  photo?: string;
  institution: InstitutionType;
  branch: string;
  enrollmentDate: string;
  currentSemester: number;
  totalFeesPaid: number;
}

export interface FeeReceipt {
  receiptId: string;
  studentId: string;
  amount: number;
  date: string;
  paymentMode: 'Cash' | 'Online' | 'Cheque';
  remarks?: string;
  monthRange: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'High' | 'Normal';
}
