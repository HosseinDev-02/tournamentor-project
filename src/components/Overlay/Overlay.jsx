
export default function Overlay({ show, setShow, className }) {
    return (
        <div onClick={setShow} className={`fixed inset-0 z-40 transition-all duration-300 ${show ? 'visible opacity-100' : 'invisible opacity-0'} ${className}`}></div>
    )
}