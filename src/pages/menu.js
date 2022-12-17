
import { TYPE }from '../common/data';
export default ()=>{
    return(
        <div>
            {TYPE.map(i=><span 
            className={`type-item`} 
            style={{background:i.color,borderColor:i.color,width:'auto',padding:'2px 4px'}}
            
            >{i.name} -- {i.material}</span>)}
        </div>
    )
}