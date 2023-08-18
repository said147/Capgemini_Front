import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';

 










import { UsersProfileComponent } from './pages/users-profile/users-profile.component';

import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';

import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { DetailsComponent } from './components/details/details.component';
import { RequestDepartComponent } from './components/request-depart/request-depart.component';
import { ReponseDepartComponent } from './components/reponse-depart/reponse-depart.component';
import { RequestTeleworkComponent } from './components/request-telework/request-telework.component';
import { ReponseTeleworkComponent } from './components/reponse-telework/reponse-telework.component';
import { RequestVoucherComponent } from './components/request-voucher/request-voucher.component';
import { ReponseVoucherComponent } from './components/reponse-voucher/reponse-voucher.component';
import { HomeComponent } from './pages/home/home.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ReponseHandoverComponent } from './components/reponse-handover/reponse-handover.component';
import { RequestHandoverComponent } from './components/request-handover/request-handover.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RequestChangeComponent } from './components/request-change/request-change.component';
import { EditHandoverComponent } from './components/edit-handover/edit-handover.component';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SearchPipe } from './search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetailsReturnComponent } from './components/details-return/details-return.component';
import { EditReturnComponent } from './components/edit-return/edit-return.component';
import { EditTeleworkComponent } from './components/edit-telework/edit-telework.component';
import { ReponseChangeComponent } from './components/reponse-change/reponse-change.component';
import { EditChangeComponent } from './components/edit-change/edit-change.component';
import { DetailsTeleworkComponent } from './components/details-telework/details-telework.component';
import { DetailsChangeComponent } from './components/details-change/details-change.component';
import { RequestComponent } from './components/request/request.component';
import { RequestPriseComponent } from './components/request-prise/request-prise.component';
import { ViewComponent } from './components/view/view.component';
import { ViewChangeComponent } from './components/view-change/view-change.component';
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { ResponsesComponent } from './components/responses/responses.component';
import { DetailsDepartComponent } from './components/details-depart/details-depart.component';
import { ViewReturnComponent } from './components/view-return/view-return.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { QuillModule } from 'ngx-quill';
import { EditDepartComponent } from './components/edit-depart/edit-depart.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
   
  

   

    

   

  
    UsersProfileComponent,
   
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    
    PagesBlankComponent,
    DetailsComponent,
    RequestDepartComponent,
    ReponseDepartComponent,
    RequestTeleworkComponent,
    ReponseTeleworkComponent,
    RequestVoucherComponent,
    ReponseVoucherComponent,
    HomeComponent,
    RequestsComponent,
    ReponseHandoverComponent,
    RequestHandoverComponent,
    RequestChangeComponent,
    EditHandoverComponent,
    SearchPipe,
    DetailsReturnComponent,
    EditReturnComponent,
    EditTeleworkComponent,
    ReponseChangeComponent,
    EditChangeComponent,
    DetailsTeleworkComponent,
   
    DetailsChangeComponent,
        RequestComponent,
        RequestPriseComponent,
        ViewComponent,
        ViewChangeComponent,
        DetailsUserComponent,
        ResponsesComponent,
        DetailsDepartComponent,
        ViewReturnComponent,
        EditDepartComponent,
        
       
       
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,SignaturePadModule,
    AppRoutingModule,FormsModule,HttpClientModule, Ng2SearchPipeModule,NgxPaginationModule,QuillModule.forRoot(),
   
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
