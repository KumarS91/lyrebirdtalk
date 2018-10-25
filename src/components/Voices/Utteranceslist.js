import {Card, CardBody, CardText} from 'reactstrap';
import React, { Component } from 'react';

class Utteranceslist extends Component {  
        render(){
        const {url,text} = this.props;
        return(
            <div className="container">
                <div className="row">                                
                    <div  className="col-md-12" style={{marginBottom:"25px"}}>
                        <div className="audio__box">
                            <div className="audio__text">
                            <h3 >{text.length<50?`${text}`:
                            `${text.substring(0,55)}...`}</h3></div>
                             <audio controls preload="auto"
                                   src={url} type="audio/wav">Play audio
                             </audio>
                             </div>                                            
                         </div>                               
                </div>
             </div>                 
             )
         }
}

export default Utteranceslist;
