import '../styles/button.css'


export const Button = ({ title, handler }) => {
    return (
        <div className="button centered-box disable-select" onClick={handler.bind(null)}> 
            {title}
        </div>
    )
}