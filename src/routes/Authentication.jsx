import SignInForm from "src/components/authForms/SignInForm";
import SignUpForm from "src/components/authForms/SignUpForm";

const Authentication =()=>{
    return(
        <div className="flex justify-between  w-[1000px] my-[30px] mx-auto ">
            <SignInForm/>
            <SignUpForm/>
        
            
        </div>
    )
}

export default Authentication