
export default function Box({ children, className, style, key }) {
    return (
        <div key={key} style={style} className={`p-[22px] rounded shadow shadow-black/15 bg-white h-full ${className}`}>
            {
                children
            }
        </div>
    )
}