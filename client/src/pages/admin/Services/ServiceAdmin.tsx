import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

// icon
import Add from '/src/assets/icon/add.svg?react'

// hooks
import { useServices } from '../../../hooks/services/useServices';
import ServiceListAdmin from './ServiceListAdmin';

// component
import AdminToast from '../../../components/ui/ToastAdmin';


function ServiceAdmin () {

    const { data: services = [], isLoading } = useServices();

    const location = useLocation();
    const navigate = useNavigate();

    const message = location.state?.message;

    const dismissToast = () => {
        setTimeout(() => {
            navigate(location.pathname, {
                replace: true,
                state: null
            })
        }, 1500)
    };

    if (location.state?.message) {
        dismissToast();
    }


    return (
        <>
            <div className="flex flex-col w-full h-full bg-[#f2f2f2] gap-[1rem]">

                <div className="flex items-center justify-between h-[3.5rem] p-[0.5rem] px-[1rem] bg-[#fafafa] border-b border-[#292929]/10">
                    <span className="text-lg text-[#292929] font-bold">Service</span>
                    
                    <Link to={'/admin/service/create'} 
                        className="flex items-center h-full bg-gradient-to-b from-[#cc4c02] via-[#cc4c02] to-[#9a3902] hover:from-[#ff6b00] active:from-[#cc4c02] border border-[#9a3902] rounded-[10px] p-[0.75rem] gap-[0.5rem] cursor-pointer transition-all duration-200"
                    >
                        <span className="text-[#fff] leading-none text-[14px]">New Service</span>
                        <Add className="size-4" color='#fff'/>
                    </Link>
                </div>


                <ServiceListAdmin services={services}/>
            </div>

            {message && (
                <AdminToast 
                    message={message}
                    color='#FF5F15'
                />
            )}
        </>
    )
}

export default ServiceAdmin;