import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';

class Header extends Component {
   constructor(props, context) {
      super(props, context);
      this.items = [
         {
            label: 'PLAY WITH POSTS',
            icon: 'pi pi-fw pi-file',
            items: [
               {
                  label: 'POSTS',
                  icon: 'pi pi-fw pi-plus',
                  items: [
                     {
                        label: 'New Post',
                        icon: 'pi pi-fw pi-bookmark',
                        command: () => {
                           this.toggleDialog()
                        }
                     }
                  ]
               },
               {
                  label: 'Delete Post',
                  icon: 'pi pi-fw pi-trash'
               },
               {
                  separator: true
               }
            ]
         }]
      this.state = {
         visible: false
      }
   }

   render() {
      const footer = (
         <div>
            <Button label="Yes" icon="pi pi-check" onClick={this.onHide} />
            <Button label="No" icon="pi pi-times" onClick={this.onHide} className="p-button-secondary" />
         </div>
      );
      return (
         <>
            <Dialog header="Create New Post" visible={this.state.visible} style={{ width: '50vw' }} footer={footer} onHide={this.onHide} maximizable>

            </Dialog>
            <Menubar model={this.items}>
               <InputText placeholder="Search" type="text" />
               <Button label="Logout" icon="pi pi-power-off" style={{ marginLeft: 4 }} onClick={this.logOut}/>
            </Menubar>
         </>
      )
   }

   toggleDialog = e => {
      this.setState(prevState => ({
         visible: true
      }))
   }

   onHide = e => {
      this.setState(prevState => ({
         visible: false
      }))
   }

   logOut = e => {
      this.props.history.push('/');
   }
}

export default withRouter(Header);