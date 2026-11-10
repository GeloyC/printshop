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
            <div className="flex flex-col w-full h-full bg-[#f2f2f2] gap-[1rem]">

                <div className="flex items-center justify-between p-[0.75rem] px-[1rem] bg-[#fafafa] border-b border-[#292929]/10">
                    <span className="text-2xl text-[#292929] font-bold">Service</span>
                    
                    <Link to={'/admin/service/create'} 
                        className="flex items-center bg-[#292929] hover:bg-[#141414] active:bg-[#292929] rounded-[10px] min-w-[5rem] p-[0.75rem] px-[1rem] gap-[0.5rem] cursor-pointer transition-all duration-100"
                    >
                        <span className="text-[#fff] leading-none text-sm font-bold">Create Service</span>
                        <Add className="size-5" fill='#fff'/>
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