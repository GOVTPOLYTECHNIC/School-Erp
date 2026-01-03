
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  ReceiptIndianRupee, 
  Plus, 
  Trash2, 
  Edit3, 
  School,
  LogOut,
  Printer,
  Menu,
  X,
  MapPin,
  Phone,
  QrCode,
  CheckCircle,
  GraduationCap,
  Upload,
  User,
  FileUp,
  Download,
  Bell,
  Eye,
  Wallet,
  Megaphone,
  History,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Lock,
  Database,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Info,
  FileSpreadsheet
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

import { InstitutionType, Student, FeeReceipt, Expense, Notice } from './types';
import { INSTITUTIONS, INITIAL_STUDENTS } from './constants';

const numberToWords = (num: number): string => {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[Number(n[1][0])] + ' ' + a[Number(n[1][1])]) + 'Crore ' : '';
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[Number(n[2][0])] + ' ' + a[Number(n[2][1])]) + 'Lakh ' : '';
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[Number(n[3][0])] + ' ' + a[Number(n[3][1])]) + 'Thousand ' : '';
  str += (Number(n[4]) !== 0) ? a[Number(n[4])] + 'Hundred ' : '';
  str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[Number(n[5][0])] + ' ' + a[Number(n[5][1])]) + 'Only' : 'Only';
  return str.trim();
};

const ReceiptCopy = ({ title, student, receipt }: { title: string, student: Student, receipt: FeeReceipt }) => {
  const inst = INSTITUTIONS[student.institution];
  return (
    <div className="flex-1 border border-slate-300 p-4 bg-white text-[10px] leading-tight flex flex-col min-h-[500px]">
      <div className="flex items-start gap-3 mb-2 border-b border-slate-200 pb-2">
         <div className="w-12 h-12 bg-indigo-600 rounded flex items-center justify-center text-white shrink-0">
           <School size={24} />
         </div>
         <div className="flex-1">
           <h2 className="text-sm font-bold text-slate-900 uppercase">Gramodyog Sewa Sansthan</h2>
           <p className="text-[8px] text-slate-500">Gauriganj Road, Musafirkhana, Amethi, UP - 227813</p>
           <p className="text-[8px] text-slate-500 font-bold">Phone: 5361-222358 | Affiliation: 2025-ERP</p>
         </div>
      </div>
      <div className="bg-slate-100 text-center py-1 font-bold border border-slate-300 mb-2 uppercase text-[8px] tracking-widest">
        Fee Receipt - 2025-26 ({title})
      </div>
      <div className="grid grid-cols-2 border border-slate-300 mb-2">
        <div className="p-1 border-r border-b border-slate-300"><b>Receipt:</b> {receipt.receiptId}</div>
        <div className="p-1 border-b border-slate-300"><b>Date:</b> {receipt.date}</div>
        <div className="p-1 border-r border-b border-slate-300 col-span-2 uppercase"><b>Student:</b> {student.name}</div>
        <div className="p-1 border-r border-b border-slate-300 col-span-2"><b>Father:</b> {student.fatherName}</div>
        <div className="p-1 border-r border-b border-slate-300"><b>Course:</b> {inst.name.split(' ').pop()}</div>
        <div className="p-1 border-b border-slate-300"><b>Branch:</b> {student.branch}</div>
        <div className="p-1 border-r border-b border-slate-300"><b>Adm No:</b> {student.admissionNo}</div>
        <div className="p-1 border-b border-slate-300"><b>Pay Mode:</b> {receipt.paymentMode}</div>
      </div>
      <table className="w-full border border-slate-300 mb-2">
        <thead><tr className="bg-slate-50"><th className="p-1 border text-left">Head</th><th className="p-1 border text-right">Amt</th></tr></thead>
        <tbody>
          <tr><td className="p-1 border">Tuition/Course Fee</td><td className="p-1 border text-right">₹{receipt.amount}/-</td></tr>
          <tr className="font-bold bg-slate-50"><td className="p-1 border">Total Paid</td><td className="p-1 border text-right">₹{receipt.amount}/-</td></tr>
          <tr className="text-[8px] italic"><td colSpan={2} className="p-1 border text-center uppercase">{numberToWords(receipt.amount)}</td></tr>
        </tbody>
      </table>
      <div className="mt-auto flex justify-between items-end pt-4">
        <QrCode size={35} className="text-slate-400" />
        <div className="text-center w-32"><div className="border-t border-slate-800 pt-1 font-bold">Authorized Sign</div></div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subValue, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-xl font-bold text-slate-800">{value}</h3>
      </div>
    </div>
    {subValue && (
      <div className="text-right">
        <p className={`text-[10px] font-bold ${subValue.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'} flex items-center gap-1`}>
          {subValue.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {subValue}
        </p>
      </div>
    )}
  </div>
);

const App: React.FC = () => {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('gss_auth') === 'true');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'fees' | 'management'>('dashboard');
  const [students, setStudents] = useState<Student[]>(() => JSON.parse(localStorage.getItem('gss_students') || JSON.stringify(INITIAL_STUDENTS)));
  const [allReceipts, setAllReceipts] = useState<FeeReceipt[]>(() => JSON.parse(localStorage.getItem('gss_receipts') || '[]'));
  const [expenses, setExpenses] = useState<Expense[]>(() => JSON.parse(localStorage.getItem('gss_expenses') || '[]'));
  const [notices, setNotices] = useState<Notice[]>(() => JSON.parse(localStorage.getItem('gss_notices') || '[]'));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterInst, setFilterInst] = useState<string>('All');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showReceipt, setShowReceipt] = useState<FeeReceipt | null>(null);
  const [showLedger, setShowLedger] = useState<Student | null>(null);
  const [collectingFeeFor, setCollectingFeeFor] = useState<Student | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tempPhoto, setTempPhoto] = useState<string | undefined>(undefined);
  const [importPreview, setImportPreview] = useState<Student[] | null>(null);
  
  // Track selected institution in modal to dynamically show branches
  const [selectedInstInModal, setSelectedInstInModal] = useState<InstitutionType>(InstitutionType.POLYTECHNIC);

  const selectedStudentForReceipt = useMemo(() => {
    if (!showReceipt) return null;
    return students.find(s => s.id === showReceipt.studentId) || null;
  }, [showReceipt, students]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('gss_students', JSON.stringify(students));
      localStorage.setItem('gss_receipts', JSON.stringify(allReceipts));
      localStorage.setItem('gss_expenses', JSON.stringify(expenses));
      localStorage.setItem('gss_notices', JSON.stringify(notices));
    }
  }, [students, allReceipts, expenses, notices, isLoggedIn]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      (s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterInst === 'All' || s.institution === filterInst)
    );
  }, [students, searchQuery, filterInst]);

  const financials = useMemo(() => {
    const totalFees = students.reduce((sum, s) => sum + s.totalFeesPaid, 0);
    const totalExp = expenses.reduce((sum, e) => sum + e.amount, 0);
    return { income: totalFees, expenses: totalExp, balance: totalFees - totalExp };
  }, [students, expenses]);

  // --- Login Logic ---
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const user = fd.get('username');
    const pass = fd.get('password');

    if (user === 'admin' && pass === 'gss@2025') {
      setIsLoggedIn(true);
      localStorage.setItem('gss_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('gss_auth');
  };

  // --- CSV Import Logic ---
  const handleCsvImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split('\n');
      const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
      
      const parsedStudents: Student[] = [];
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue;
        const cols = rows[i].split(',').map(c => c.trim());
        
        // Dynamic Column Mapping
        const getVal = (headerName: string) => {
           const idx = headers.indexOf(headerName);
           return idx !== -1 ? cols[idx] : '';
        };

        const instRaw = getVal('institution');
        let institution = InstitutionType.POLYTECHNIC;
        if (instRaw.toLowerCase().includes('iti')) institution = InstitutionType.ITI;
        else if (instRaw.toLowerCase().includes('gss') || instRaw.toLowerCase().includes('sansthan')) institution = InstitutionType.GSS;

        const newStudent: Student = {
          id: `STU${Date.now()}${i}`,
          admissionNo: getVal('admission_no') || `GSS/${new Date().getFullYear()}/${Math.floor(100+Math.random()*900)}`,
          rollNumber: getVal('roll_no') || 'TBD',
          name: getVal('name') || 'Unknown',
          fatherName: getVal('father_name') || '',
          dob: getVal('dob') || '2000-01-01',
          mobileNumber: getVal('mobile') || '',
          address: getVal('address') || '',
          institution: institution,
          branch: getVal('branch') || INSTITUTIONS[institution].branches[0],
          enrollmentDate: new Date().toISOString().split('T')[0],
          currentSemester: 1,
          totalFeesPaid: Number(getVal('fees_paid')) || 0,
        };
        parsedStudents.push(newStudent);
      }
      setImportPreview(parsedStudents);
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const confirmImport = () => {
    if (importPreview) {
      setStudents(prev => [...prev, ...importPreview]);
      setImportPreview(null);
      alert(`Successfully imported ${importPreview.length} students!`);
    }
  };

  const handleExportBackup = () => {
    const data = { students, allReceipts, expenses, notices, backupDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GSS_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.students && data.allReceipts) {
          if (window.confirm('This will overwrite current data. Proceed?')) {
            setStudents(data.students);
            setAllReceipts(data.allReceipts);
            setExpenses(data.expenses || []);
            setNotices(data.notices || []);
          }
        }
      } catch (err) { alert('Invalid file'); }
    };
    reader.readAsText(file);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Confirm delete?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
      setAllReceipts(prev => prev.filter(r => r.studentId !== id));
    }
  };

  const openAddStudentModal = (stu: Student | null = null) => {
    setEditingStudent(stu);
    setSelectedInstInModal(stu ? stu.institution : InstitutionType.POLYTECHNIC);
    setShowModal(true);
  };

  const handleSaveStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const inst = fd.get('institution') as InstitutionType;
    const studentData: Student = {
      id: editingStudent?.id || `STU${Date.now()}`,
      admissionNo: editingStudent?.admissionNo || `GSS/${new Date().getFullYear()}/${Math.floor(100+Math.random()*900)}`,
      rollNumber: fd.get('rollNumber') as string || 'TBD',
      name: fd.get('name') as string,
      fatherName: fd.get('fatherName') as string,
      dob: fd.get('dob') as string,
      mobileNumber: fd.get('mobileNumber') as string,
      address: fd.get('address') as string,
      photo: tempPhoto || editingStudent?.photo,
      institution: inst,
      branch: fd.get('branch') as string,
      enrollmentDate: editingStudent?.enrollmentDate || new Date().toISOString().split('T')[0],
      currentSemester: Number(fd.get('semester')),
      totalFeesPaid: editingStudent?.totalFeesPaid || 0,
    };
    setStudents(prev => editingStudent ? prev.map(s => s.id === editingStudent.id ? studentData : s) : [...prev, studentData]);
    setShowModal(false); setEditingStudent(null); setTempPhoto(undefined);
  };

  const handleFeeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!collectingFeeFor) return;
    const fd = new FormData(e.currentTarget);
    const amount = Number(fd.get('amount'));
    const receipt: FeeReceipt = {
      receiptId: `REC${Math.floor(1000+Math.random()*9000)}`,
      studentId: collectingFeeFor.id,
      amount,
      date: new Date().toLocaleDateString('en-GB'),
      paymentMode: fd.get('paymentMode') as any,
      monthRange: fd.get('monthRange') as string || '2025-26'
    };
    setAllReceipts(prev => [...prev, receipt]);
    setStudents(prev => prev.map(s => s.id === collectingFeeFor.id ? {...s, totalFeesPaid: s.totalFeesPaid + amount} : s));
    setCollectingFeeFor(null); 
    setTimeout(() => setShowReceipt(receipt), 100);
  };

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const expense: Expense = {
      id: `EXP${Date.now()}`,
      title: fd.get('title') as string,
      amount: Number(fd.get('amount')),
      date: new Date().toLocaleDateString('en-GB'),
      category: fd.get('category') as string
    };
    setExpenses(prev => [...prev, expense]);
    e.currentTarget.reset();
  };

  const handleAddNotice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const notice: Notice = {
      id: `NOT${Date.now()}`,
      title: fd.get('title') as string,
      content: fd.get('content') as string,
      date: new Date().toLocaleDateString('en-GB'),
      priority: fd.get('priority') as any
    };
    setNotices(prev => [notice, ...prev]);
    e.currentTarget.reset();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
           <div className="bg-indigo-600 p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
                <School size={32} />
              </div>
              <h1 className="text-xl font-black uppercase tracking-widest">Gramodyog Sewa</h1>
              <p className="text-indigo-100 text-xs mt-1 uppercase font-bold tracking-widest opacity-80">ERP Login Portal</p>
           </div>
           <div className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Administrator Access</label>
                    <div className="relative">
                       <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                       <input name="username" placeholder="Username" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Security Key</label>
                    <div className="relative">
                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                       <input name="password" type="password" placeholder="Password" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                 </div>
                 {loginError && <p className="text-rose-500 text-[10px] font-black uppercase text-center">{loginError}</p>}
                 <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                    <ShieldCheck size={16} /> Authenticate
                 </button>
              </form>
           </div>
           <div className="p-4 bg-slate-50 border-t text-center">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">&copy; 2025 Gramodyog Sewa Sansthan Amethi</p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <School className="text-indigo-600" size={24} />
          <span className="font-bold text-xs uppercase tracking-tighter">GSS ERP Amethi</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600"><Menu size={24} /></button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg"><School size={24} /></div>
            <div><h1 className="font-bold text-[10px] uppercase">Gramodyog Sewa</h1><p className="text-[9px] text-slate-500 font-bold uppercase">Amethi Portal</p></div>
          </div>
          <nav className="space-y-2 flex-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'fees', label: 'Finances', icon: ReceiptIndianRupee },
              { id: 'management', label: 'Management', icon: Wallet }
            ].map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id as any); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>
                <item.icon size={18} /><span className="tracking-widest">{item.label}</span>
              </button>
            ))}
          </nav>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-600 text-xs font-bold uppercase mt-auto border-t pt-6"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
            {activeTab.toUpperCase()}
          </h2>
          <div className="flex gap-2">
            {activeTab === 'students' && (
               <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-200">
                  <Filter size={14} className="text-slate-400" />
                  <select value={filterInst} onChange={(e) => setFilterInst(e.target.value)} className="bg-transparent text-[10px] font-bold uppercase outline-none">
                     <option value="All">All Institutions</option>
                     {Object.values(InstitutionType).map(v => <option key={v} value={v}>{v.replace('Rajiv Gandhi ', '')}</option>)}
                  </select>
               </div>
            )}
            {activeTab === 'students' && (
              <label className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-2 border border-emerald-100 cursor-pointer hover:bg-emerald-100">
                <FileSpreadsheet size={16} /> Bulk Import
                <input type="file" accept=".csv" className="hidden" onChange={handleCsvImport} />
              </label>
            )}
            <button onClick={() => openAddStudentModal()} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition-all"><Plus size={16} /> New Student</button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Collection" value={`₹${financials.income.toLocaleString()}`} subValue="+12% vs last month" icon={ReceiptIndianRupee} color="indigo" />
              <StatCard title="Expenses" value={`₹${financials.expenses.toLocaleString()}`} subValue="-5% this week" icon={Wallet} color="rose" />
              <StatCard title="Net Balance" value={`₹${financials.balance.toLocaleString()}`} icon={Wallet} color="emerald" />
              <StatCard title="Students" value={students.length} subValue="+3 new today" icon={Users} color="blue" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                 <h3 className="text-xs font-bold uppercase text-slate-400 mb-6 tracking-widest">Enrollment Distribution</h3>
                 <div className="h-[250px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={Object.values(InstitutionType).map(t => ({ name: t.replace('Rajiv Gandhi ', ''), count: students.filter(s => s.institution === t).length }))}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" fontSize={10} fontStyle="bold" /><YAxis fontSize={10} /><Tooltip /><Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
              </div>
              <div className="bg-indigo-900 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="text-xs font-bold uppercase opacity-60 mb-4 flex items-center gap-2"><Megaphone size={14} /> Notice Board</h3>
                   <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {notices.length === 0 ? <p className="text-xs opacity-40">No active announcements.</p> : notices.map(n => (
                        <div key={n.id} className={`p-3 rounded-2xl border-l-4 ${n.priority === 'High' ? 'border-rose-400 bg-white/10' : 'border-indigo-400 bg-white/5'}`}>
                           <p className="text-[10px] font-black uppercase mb-1">{n.title}</p>
                           <p className="text-[9px] opacity-70 leading-relaxed">{n.content}</p>
                           <p className="text-[8px] mt-2 opacity-40 font-bold">{n.date}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
           <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in">
              <div className="p-6 border-b flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Quick search students..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-widest"><tr className="border-b"><th className="px-6 py-4 text-left">Profile</th><th className="px-6 py-4 text-left">Course</th><th className="px-6 py-4 text-left">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                    <tbody className="divide-y divide-slate-50">
                       {filteredStudents.map(s => (
                          <tr key={s.id} className="hover:bg-slate-50 transition-all">
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                      {s.photo ? <img src={s.photo} className="w-full h-full object-cover" /> : <User size={20} className="text-slate-300" />}
                                   </div>
                                   <div><p className="font-black text-xs text-slate-900 uppercase">{s.name}</p><p className="text-[9px] font-bold text-slate-400">ADM: {s.admissionNo}</p></div>
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{s.branch}</span>
                                <p className="text-[8px] font-bold text-slate-400 mt-1">{s.institution.replace('Rajiv Gandhi ', '')}</p>
                             </td>
                             <td className="px-6 py-4"><div className="flex flex-col"><p className="text-[10px] font-black uppercase text-emerald-500">PAID: ₹{s.totalFeesPaid.toLocaleString()}</p><p className="text-[8px] font-bold text-slate-300 italic">Sem: {s.currentSemester}</p></div></td>
                             <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-1">
                                   <button onClick={() => openAddStudentModal(s)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl"><Edit3 size={16} /></button>
                                   <button onClick={() => handleDelete(s.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"><Trash2 size={16} /></button>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}

        {activeTab === 'fees' && (
           <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in">
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b"><tr><th className="px-6 py-4 text-left">Student</th><th className="px-6 py-4 text-left">Balance</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
                    <tbody className="divide-y divide-slate-50">
                       {filteredStudents.map(s => {
                          const annual = INSTITUTIONS[s.institution].annualFee;
                          const balance = annual - s.totalFeesPaid;
                          return (
                             <tr key={s.id}>
                                <td className="px-6 py-4"><p className="font-black text-xs text-slate-900 uppercase">{s.name}</p><p className="text-[9px] font-bold text-slate-400">{s.branch}</p></td>
                                <td className="px-6 py-4"><p className={`text-[11px] font-black ${balance > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>₹{balance.toLocaleString()}</p></td>
                                <td className="px-6 py-4 text-right">
                                   <div className="flex justify-end items-center gap-1">
                                      <button onClick={() => setShowLedger(s)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl" title="View Detailed Ledger"><History size={18} /></button>
                                      <button onClick={() => setCollectingFeeFor(s)} className="bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-indigo-700">Collect</button>
                                   </div>
                                </td>
                             </tr>
                          );
                       })}
                    </tbody>
                 </table>
              </div>
           </div>
        )}

        {activeTab === 'management' && (
           <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              {/* Bulk Import Guidance Card */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                 <h3 className="text-sm font-black uppercase text-slate-900 mb-6 flex items-center gap-2"><FileSpreadsheet size={20} className="text-emerald-600" /> Student Data Import</h3>
                 <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                       <p className="text-xs font-black uppercase text-emerald-800 mb-2">Import from .csv</p>
                       <p className="text-[10px] text-emerald-600 font-medium mb-4 leading-relaxed">Prepare a CSV file with these column headers: <code className="bg-emerald-100 px-1 rounded">Name, Father_Name, Mobile, DOB, Institution, Branch, Address</code>. You can then upload it to add multiple students instantly.</p>
                       <div className="flex gap-2">
                          <label className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-700 cursor-pointer">
                             <Upload size={14} /> Upload CSV
                             <input type="file" accept=".csv" className="hidden" onChange={handleCsvImport} />
                          </label>
                          <a href="data:text/csv;charset=utf-8,Name,Father_Name,Mobile,DOB,Institution,Branch,Address,Admission_No,Roll_No,Fees_Paid%0ARahul Kumar,Suresh Kumar,9876543210,2005-01-01,Polytechnic,Civil Engg,Amethi,GSS/2025/101,7001,5000" download="GSS_Student_Import_Sample.csv" className="bg-white text-emerald-600 border border-emerald-200 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-50">
                             <Download size={14} /> Sample File
                          </a>
                       </div>
                    </div>
                    <div className="w-full md:w-32 h-32 bg-emerald-100/50 rounded-3xl flex items-center justify-center text-emerald-300">
                       <FileUp size={48} />
                    </div>
                 </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                 <h3 className="text-sm font-black uppercase text-slate-900 mb-6 flex items-center gap-2"><Database size={20} className="text-indigo-600" /> Data Backup & Recovery</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                       <p className="text-xs font-black uppercase text-indigo-800 mb-2">Export Backup</p>
                       <button onClick={handleExportBackup} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Download size={14} /> Download File
                       </button>
                    </div>
                    <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                       <p className="text-xs font-black uppercase text-orange-800 mb-2">Restore Backup</p>
                       <label className="bg-orange-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer w-fit">
                          <RefreshCw size={14} /> Upload & Restore
                          <input type="file" className="hidden" accept=".json" onChange={handleImportBackup} />
                       </label>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>

      {/* CSV Import Preview Modal */}
      {importPreview && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b flex justify-between items-center">
              <div>
                <h3 className="font-black uppercase tracking-widest text-sm">Review Import List</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{importPreview.length} Students found in file</p>
              </div>
              <button onClick={() => setImportPreview(null)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[9px] uppercase font-black text-slate-400 border-b">
                    <tr><th className="px-4 py-2">Name</th><th className="px-4 py-2">Institution</th><th className="px-4 py-2">Branch</th><th className="px-4 py-2">Fees Paid</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {importPreview.map((s, idx) => (
                      <tr key={idx} className="text-[10px] font-bold">
                        <td className="px-4 py-2 uppercase">{s.name}</td>
                        <td className="px-4 py-2 text-indigo-600">{s.institution.replace('Rajiv Gandhi ', '')}</td>
                        <td className="px-4 py-2">{s.branch}</td>
                        <td className="px-4 py-2">₹{s.totalFeesPaid.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
            <div className="p-6 bg-slate-50 border-t flex justify-end gap-3">
               <button onClick={() => setImportPreview(null)} className="px-6 py-2 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-white border">Cancel</button>
               <button onClick={confirmImport} className="px-6 py-2 rounded-xl text-[10px] font-black uppercase bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700">Confirm & Import All</button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="px-8 py-6 border-b flex justify-between items-center"><h3 className="font-black uppercase tracking-widest text-sm">{editingStudent ? 'Update' : 'New'} Student</h3><button onClick={() => { setShowModal(false); setEditingStudent(null); }} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button></div>
            <form onSubmit={handleSaveStudent} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex justify-center mb-2">
                 <div className="relative"><div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center overflow-hidden">{tempPhoto || editingStudent?.photo ? <img src={tempPhoto || editingStudent?.photo} className="w-full h-full object-cover" /> : <User size={40} className="text-slate-200" />}</div><button type="button" onClick={() => document.getElementById('photo-up')?.click()} className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl border-4 border-white"><Upload size={14} /></button></div>
                 <input type="file" id="photo-up" className="hidden" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if(f){const r = new FileReader(); r.onloadend = () => setTempPhoto(r.result as string); r.readAsDataURL(f);} }} />
              </div>
              <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Full Name</label><input name="name" defaultValue={editingStudent?.name} required className="w-full px-4 py-2 border rounded-xl text-xs font-bold" /></div>
              <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Father Name</label><input name="fatherName" defaultValue={editingStudent?.fatherName} required className="w-full px-4 py-2 border rounded-xl text-xs font-bold" /></div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Institution</label>
                <select name="institution" value={selectedInstInModal} onChange={(e) => setSelectedInstInModal(e.target.value as InstitutionType)} className="w-full px-4 py-2 border rounded-xl text-xs font-bold">
                  {Object.values(InstitutionType).map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Branch</label>
                <select name="branch" defaultValue={editingStudent?.branch} required className="w-full px-4 py-2 border rounded-xl text-xs font-bold">
                  {INSTITUTIONS[selectedInstInModal].branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Mobile</label><input name="mobileNumber" defaultValue={editingStudent?.mobileNumber} required className="w-full px-4 py-2 border rounded-xl text-xs font-bold" /></div>
              <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">DOB</label><input name="dob" type="date" defaultValue={editingStudent?.dob} required className="w-full px-4 py-2 border rounded-xl text-xs font-bold" /></div>
              <div className="md:col-span-2"><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Address</label><textarea name="address" defaultValue={editingStudent?.address} required className="w-full px-4 py-2 border rounded-xl text-xs font-bold h-20" /></div>
              <button type="submit" className="md:col-span-2 bg-indigo-600 text-white py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg">Save Enrollment</button>
            </form>
          </div>
        </div>
      )}

      {showLedger && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
               <div className="p-6 bg-slate-50 border-b flex justify-between items-center"><h3 className="font-black uppercase text-xs">Payment Ledger: {showLedger.name}</h3><button onClick={() => setShowLedger(null)}><X size={20} /></button></div>
               <div className="flex-1 overflow-y-auto p-6">
                  <table className="w-full text-left">
                    <thead className="text-[10px] uppercase font-black text-slate-400 border-b tracking-wider">
                      <tr><th className="pb-3">Receipt #</th><th className="pb-3">Date</th><th className="pb-3">Mode</th><th className="pb-3 text-right">Amount</th><th className="pb-3 text-right">View</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {allReceipts.filter(r => r.studentId === showLedger.id).map(r => (
                        <tr key={r.receiptId} className="hover:bg-slate-50">
                          <td className="py-4 text-[10px] font-bold">{r.receiptId}</td>
                          <td className="py-4 text-[10px] font-bold">{r.date}</td>
                          <td className="py-4 text-[10px] font-bold uppercase">{r.paymentMode}</td>
                          <td className="py-4 text-[10px] font-black text-indigo-600 text-right">₹{r.amount.toLocaleString()}</td>
                          <td className="py-4 text-right">
                             <button onClick={() => setShowReceipt(r)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Eye size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
         </div>
      )}

      {collectingFeeFor && (
         <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95"><div className="p-6 bg-indigo-600 text-white flex justify-between items-center font-black uppercase text-xs"><span><ReceiptIndianRupee size={16} className="inline mr-2" /> Fee Collection</span><button onClick={() => setCollectingFeeFor(null)}><X size={18} /></button></div><form onSubmit={handleFeeSubmit} className="p-8 space-y-4"><input name="amount" type="number" placeholder="Enter Amount (₹)" required className="w-full px-4 py-3 border-2 border-indigo-50 rounded-2xl text-lg font-black outline-none focus:border-indigo-500" /><input name="monthRange" placeholder="Remarks/Month Range" required defaultValue="2025-26" className="w-full px-4 py-2 border rounded-xl text-xs font-bold" /><select name="paymentMode" className="w-full px-4 py-2 border rounded-xl text-xs font-bold outline-none"><option value="Cash">Cash Payment</option><option value="Online">Online Transfer</option><option value="Cheque">Bank Cheque</option></select><button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-100">Confirm & Print</button></form></div>
         </div>
      )}

      {showReceipt && selectedStudentForReceipt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/90 no-print overflow-y-auto">
          <div className="bg-slate-200 p-8 rounded-lg max-w-[1000px] w-full">
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-2xl overflow-x-auto">
               <ReceiptCopy title="Office Copy" student={selectedStudentForReceipt} receipt={showReceipt} />
               <div className="border-l border-dashed border-slate-400 mx-1 hidden md:block"></div>
               <ReceiptCopy title="Student Copy" student={selectedStudentForReceipt} receipt={showReceipt} />
            </div>
            <div className="mt-6 flex gap-4">
               <button onClick={() => window.print()} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 uppercase text-xs tracking-widest"><Printer size={20} /> Print Receipt</button>
               <button onClick={() => setShowReceipt(null)} className="flex-1 bg-white text-slate-600 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">Close Preview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
