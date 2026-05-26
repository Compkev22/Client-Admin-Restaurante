import HelloIcon from '../../../assets/icons/Hello.svg';

const formatTodayDate = () => {
    return new Date().toLocaleDateString('es-GT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const DashboardHeader = ({ userName }) => {
    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 italic uppercase flex items-center gap-3 flex-wrap">
                Hola,{' '}
                <span className="text-kinal-red">
                    {userName || 'Administrador'}
                </span>
                <img
                    src={HelloIcon}
                    alt="Hola"
                    className="w-7 h-7 md:w-8 md:h-8 inline-block animate-bounce"
                />
            </h1>
            <p className="text-gray-500 font-medium mt-1 text-sm md:text-base capitalize">
                Aquí tienes el resumen operativo de hoy,{' '}
                <span className="font-bold text-gray-600">{formatTodayDate()}</span>.
            </p>
        </div>
    );
};