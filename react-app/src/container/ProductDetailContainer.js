import React,{Component,Fragment} from 'react';
import * as action from '../Store/actions/index'
import {connect} from 'react-redux'
import ProductDetailComponent from '../component/ProductDetailComponent'
import ProductDetailImage from '../component/ProductDetailImage'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    container: {
        marginTop: 90,
        width: '100%',
        margin: 0,
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
        }
    }
});


class ProductDetailContainer extends Component{


     componentDidMount(){
       this.props.fetchProductById(this.props.match.params.id);
        
      }

      render(){
        const { classes } = this.props;
      
        return( 
            <Fragment >
            
              {this.props.productDetail?   
               <Grid container className={classes.container} spacing={0}>
               <Grid item xs={12} md={4} >
               <ProductDetailImage  image={this.props.productDetail.images[0]}/>
              </Grid>
              <Grid item xs={12} md={7} >
              <ProductDetailComponent description={this.props.productDetail.description}/>
              </Grid>
              </Grid>
             
            
             :null} 
            </Fragment>
    
      )
    
    }
    
    }
    
    const mapStateToProps = state=>{

        return{
            productDetail:state.product.productDetail
        };
    };
    
    const mapDispatchTpProps=dispatch=>{
     
        return{
            fetchProductById:(id)=>{dispatch(action.fetchProductById(id))}
        };
    }
 export default connect(mapStateToProps,mapDispatchTpProps)(withStyles(styles)(ProductDetailContainer));
