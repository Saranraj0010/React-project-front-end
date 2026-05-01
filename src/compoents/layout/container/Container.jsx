import { lazy, Suspense } from "react";

// Lazy load all pages
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const StudentDetails = lazy(() => import("../student/studentDetails/StudentDetails"));
const Staff = lazy(() => import("../staff/Staff"));
const TotalStaff = lazy(() => import("../staff/TotalStaff"));
const StudentAdmission = lazy(() => import("../student/StudentAdmission"));
const Standard = lazy(() => import("../standard/Standard"));
const AdmissionDetails = lazy(() => import("../student/admissionDetails/AdmissionDetails"));
const Role = lazy(() => import("../role/Role"));
const Circular = lazy(() => import("../circular/Circular"));
const Section = lazy(() => import("../section/Section"));
const Calendar = lazy(() => import("../calendar/Calendar"));
const StaffAllocation = lazy(() => import("../staffAllocation/StaffAllocation"));
const Subject = lazy(() => import("../subject/Subject"));
const Fees = lazy(() => import("../fees/Fees"));
const Payment = lazy(() => import("../payment/Payment"));
const AddAdmin = lazy(() => import("../addAdmin/AddAdmin"));

const Container = ({ activePage }) => {

  // Page mapping
  const pages = {
    dashboard: <Dashboard />,
    staffAllocation: <StaffAllocation />,
    circular: <Circular />,
    studentDetails: <StudentDetails />,
    staff: <Staff />,
    staffDetails: <TotalStaff />,
    studentAdmission: <StudentAdmission />,
    admissionDetails: <AdmissionDetails />,
    fees: <Fees />,
    payment: <Payment />,
    standard: <Standard />,
    role: <Role />,
    section: <Section />,
    calendar: <Calendar />,
    subject: <Subject />,
    addAdmin: <AddAdmin />,
  };

  return (
    <div className="w-full min-h-screen bg-white shadow-2xl p-5">

      {/* Suspense Loader */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
          </div>
        }
      >
        {pages[activePage] || <Dashboard />}
      </Suspense>

    </div>
  );
};

export default Container;