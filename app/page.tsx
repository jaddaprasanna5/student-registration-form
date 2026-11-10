import StudentForm from "../components/StudentForm"

export default function Home(){
    return (
      <div className="py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Student Registration System</h1>
      <StudentForm />
      </div>
    );
}