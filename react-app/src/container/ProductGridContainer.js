import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ProductGrid from '../component/ProductGrid'
import * as action from '../store/actions/index'
import {connect} from 'react-redux'

class ProductGridContainer extends Component{

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.changeInSearchParam();
          }
         
    
      }
     componentDidMount(){
        this.changeInSearchParam();
        
      }

    changeInSearchParam=()=>{
        let address={ }
        let product=''
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            console.log(param); // yields ['start', '5']
            if(param[0]==='lat'){
                address.lat=param[1]
            }
            if(param[0]==='lng'){
                address.lng=param[1]
            }
            if(param[0]==='location'){
                address.location=param[1]
            }
            if(param[0]==='product'){
                product=param[1]
            }

        }
        
        this.props.onsearch(address,product)
      } 


      render(){
        let productGrids=null    
        if(this.props.productlist){
         productGrids=this.props.productlist.map((product,index)=>{
            return <ProductGrid key={index} product={product} address={this.props.address}/>
        })
        }
        return( 
            <Grid container style={{marginTop:90,paddingLeft:5}} spacing={0}>  
            {productGrids} 
           </Grid> 
    
      )
    
    }
    
    }
    
    const mapStateToProps = state=>{

        return{
          address:state.location.address,
          productlist:state.product.productlist,
        };
    };
    
    const mapDispatchTpProps=dispatch=>{
     
        return{
            onsearchoflocation:(input)=>dispatch(action.onsearchoflocation(input)),
            onchangeoflocation:(input)=>dispatch(action.actiononchangeoflocation(input)),
            onchangeofproduct:(input)=>dispatch(action.onchangeofproduct(input)),
            onsearch:(address,productname)=>dispatch(action.onproductlistupdate(address,productname)),
        };
    }
 export default connect(mapStateToProps,mapDispatchTpProps)(ProductGridContainer);





