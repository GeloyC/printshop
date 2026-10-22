import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

// icon
import Add from '/src/assets/icon/add-service.svg?react'

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
            <div className="flex flex-col w-full h-full bg-[#fff]">

                <div className="flex items-center justify-between border-b border-[#292929]/10 p-[1rem]">
                    <span className="text-[20px] text-[#292929] font-bold">Service</span>
                    
                    <Link to={'/admin/service/create'} className="flex items-center bg-[#ff6b00] hover:bg-[#ff810a] active:bg-[#ff6b00] rounded-[5px] min-w-[5rem] py-[0.5rem] px-[1rem] gap-[0.5rem] cursor-pointer transition-all duration-100">
                        <Add className="size-5" fill='#fff'/>
                        <span className="text-[#fff] leading-none text-[14px] font-bold">Create Service</span>
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