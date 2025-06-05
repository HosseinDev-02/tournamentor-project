import * as Icons from 'react-icons/bi';
export default function SecondaryButton({ title, onClick, className, icon, iconSize, iconClassName, titleClassName }) {
    let Icon;
    if(icon) {
        Icon = Icons[icon]
    }
    return (
        <button onClick={onClick}
            className={`flex items-center justify-center gap-1 bg-[#e7ebef] text-[#69809a] font-IranYekan-Bold text-2sm text-center rounded py-2 px-[22px] hover:bg-[#69809a] hover:text-white transition-all duration-300 ${className}`}>
            {
                icon && (
                    <span className={iconClassName}>
                        <Icon size={iconSize}/>
                    </span>
                )
            }
            {
                title && (
                    <span className={titleClassName}>{title}</span>
                )
            }
        </button>
    )
}