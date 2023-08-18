import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { TokenStorageService } from './_services/token-storage-service';

@Injectable({
  providedIn: 'root'
})
export class HelpdeskserviceService {
  urlProduct ="http://localhost:8082/addDemande";
  urlrequest="http://localhost:8082/demande";
  urlrequests="http://localhost:8082/demane/";
  urluser="http://localhost:8082/users";
  urlUp="http://localhost:8082/contacts/";
  urlPr="http://localhost:8082/addClien";
  urlRep="http://localhost:8082/demandes/"
  urlreque="http://localhost:8082/demandeww";
 /* httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};*/
currentUser:any;
isLoggedIn:any;

  constructor(private Http: HttpClient,private token: TokenStorageService) { 
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.prenom)
    console.log(this.currentUser.roles)
    console.log(this.currentUser.accessToken)
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
    

    
      console.log(user);
    }
  }
  
   httpOptions =
    { headers: new HttpHeaders().set('Authorization',`Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYWlkIiwiaWF0IjoxNjkxNTMyNzEzLCJleHAiOjE2OTE2MTkxMTN9.LLhjVCcLNMOwgHAZq1-6YdUEKuRlXxkX6ENLEJrtxbSJTsTOQiYh-hfrjwNkHiM3UgecU8BAbD0MOuI346oN_w"}`)};
   
    
  
  saveDemande(data:any) {
     
    return this.Http.post(this.urlProduct,data,this.httpOptions);
        }

        addTiquete(data:any){
          return this.Http.post('http://localhost:8082/addTiquete',data,this.httpOptions);
        }



      


        
        listTiquetes() {
          return this.Http.get('http://localhost:8082/Tiquetes');
               }
              
               getTiquete(id_tiquete:any) {
                return this.Http.get('http://localhost:8082/Tiquete/'+id_tiquete,id_tiquete)
                   }

        listProduct() {
          return this.Http.get(this.urlrequest);
               }
               listProductss(motCle:string,page:number,size:number) {
                return this.Http.get("http://localhost:8082/cherchertiquete?mc="+motCle+"&size"+size+"&page="+page)
                     }
                     listProductsse(motCle:string,page:number,size:number) {
                      return this.Http.get("http://localhost:8082/cherchertiquetes?mc="+motCle+"&size"+size+"&page="+page)
                           }

                           listProductssee(motCle:string,page:number,size:number) {
                            return this.Http.get("http://localhost:8082/chercherteleworks?mc="+motCle+"&size"+size+"&page="+page)
                                 }

                                 listProductsseee(motCle:string,page:number,size:number) {
                                  return this.Http.get("http://localhost:8082/chercherDparts?mc="+motCle+"&size"+size+"&page="+page)
                                       }

                     listProductsss(status:string,page:number,size:number) {
                      return this.Http.get("http://localhost:8082/cherchers?mc="+status+"&size"+size+"&page="+page)
                           }
                     CountRequests() {
                      return this.Http.get('http://localhost:8082/demandeCount');
                           }
                           CountRequestClosed() {
                            return this.Http.get('http://localhost:8082/countClosed');
                                 }
                                 CountRequestWaiting() {
                                  return this.Http.get('http://localhost:8082/demandeCountWaiting');
                                       }
                                       CountRequestEnCours() {
                                        return this.Http.get('http://localhost:8082/countCours');
                                             }
                     
               
             ////
               getProvider(id_tiquete:any) {
                return this.Http.get(this.urlrequests+id_tiquete,id_tiquete)
                   }
                   getDemandeChange(id_tiquete:any) {
                    return this.Http.get('http://localhost:8082/demaneChange/'+id_tiquete,id_tiquete)
                       }
                     

                   getMateriel(id_demande:any){
                   
                    return this.Http.get(' http://localhost:8082/materiel/'+id_demande,id_demande)
                   }
                 
                   updateProvider(id_demande:any,providerToUpdate:any) {
                    return this.Http.patch('http://localhost:8082/changeDemande/'+id_demande,providerToUpdate,this.httpOptions);
                       }
                       updateStatus(id_demande:any,providerToUpdate:any) {
                        return this.Http.patch('http://localhost:8082/changestatus/'+id_demande,providerToUpdate);
                           }
                           updateStatusTiquete(id_tiquete:any,providerToUpdate:any) {
                            return this.Http.patch('http://localhost:8082/changeStatusTiquete/'+id_tiquete,providerToUpdate);
                               }

                           
                     /*  updateProvider(id_demande:any): Observable<any> {
                        return this.Http.get('http://localhost:8082/contacts/'+id_demande, this.httpOptions )}*/

                       updateProviders(id_demande:any,providerToUpdate:any) {
                        return this.Http.patch('http://localhost:8082/updateDemande/'+id_demande,providerToUpdate,this.httpOptions);
                           }


                           saveDemand(data:any){
 return this.Http.post(this.urlPr,data);
                           }

                           listProducts() {
                            return this.Http.get(this.urlreque);
                                 }

                                 getProviders(id:any) {
                                  return this.Http.get('http://localhost:8082/demandeww/4',id)
                                     }

                                     saveMateriel(data:any) {
     
                                      return this.Http.post('http://localhost:8082/postmateril',data);
                                          }
                                  
                                          listUser() {
                                            return this.Http.get('http://localhost:8082/users');
                                                 }
                                                 listUsers(id:any) {
                                                  return this.Http.get('http://localhost:8082/user/'+id,id);
                                                       }
                                                       listmat(id:any) {
                                                        return this.Http.get('http://localhost:8082/materiel/4',id);
                                                             }

                                                             rep(id:any) {
                                                              return this.Http.get(this.urlRep+id,id);
                                                                   }
                                                                   repTiquete(id:any) {
                                                                    return this.Http.get('http://localhost:8082/TiqueteBy/'+id,id);
                                                                         }
                                                                  
                                    
                      deletet(id_demande:any) {
                        return this.Http.delete('http://localhost:8082/Deletedemande/'+id_demande,id_demande)
                      }  
                      deletettelework(id_demandeTelework:any) {
                        return this.Http.delete('http://localhost:8082/DeletedemandeTelework/'+id_demandeTelework,id_demandeTelework)
                      }  
                      Count(id:any) {
                        return this.Http.get('http://localhost:8082/demandeCountRequest/'+id,id);
                             }
                             CountChange(id:any) {
                              return this.Http.get('http://localhost:8082/demandeCountChange/'+id,id);
                                   }
                                   CountTelework(id:any) {
                                    return this.Http.get('http://localhost:8082/demandeCountTelework/'+id,id);
                                         }
                                         CountReturn(id:any) {
                                          return this.Http.get('http://localhost:8082/demandeCountReturn/'+id,id);
                                               }
                                   
                                               








                      //DemandeRetourVoucher
                      saveDemandeRetourVoucher(data:any) {
     
                        return this.Http.post('http://localhost:8082/addDemandeRetour',data,this.httpOptions);
                            
                      }
                      listDemandeRetourVoucher() {
                        return this.Http.get('http://localhost:8082/demandeRetour',this.httpOptions);
                             }
                             repDemandeRetourVoucher(id:any) {
                              return this.Http.get('http://localhost:8082/demandesRetour/'+id,this.httpOptions);
                              
                                   }
                       getDemandeRetourVoucher(id_tiquete:any) {
                                    return this.Http.get('http://localhost:8082/demaneRetour/'+id_tiquete,id_tiquete)
                                       }
                                       
                                       updateRetour(id_demandeRetour:any,providerToUpdate:any) {
                                        return this.Http.patch('http://localhost:8082/changeDemandeRetour/'+id_demandeRetour,providerToUpdate,this.httpOptions);
                                           }
                                           updateDemandeRetour(id_demandeRetour:any,providerToUpdate:any) {
                                            return this.Http.patch('http://localhost:8082/updateDemandeRetour/'+id_demandeRetour,providerToUpdate,this.httpOptions);
                                               }
                                         
                                           updateTiquete(id_tiquete:any,providerToUpdate:any) {
                                            return this.Http.patch('http://localhost:8082/changeTiquete/'+id_tiquete,providerToUpdate,this.httpOptions);
                                               }
                                         
                                           updateRetourStatus(id_demandeRetour:any,providerToUpdate:any) {
                                            return this.Http.patch('http://localhost:8082/changestatusRetour/'+id_demandeRetour,providerToUpdate,this.httpOptions);
                                               }

                                         //DemandeTelework
                                         saveDemandeTelework(data:any) {
     
                                          return this.Http.post('http://localhost:8082/addDemandeTelework',data,this.httpOptions);
                                              
                                        }
                                        //
                                        listDemandeTelework() {
                                          return this.Http.get('http://localhost:8082/demandeTelework',this.httpOptions);
                                               }
                                               listDemandeDepart() {
                                                return this.Http.get('http://localhost:8082/demandeDepart',this.httpOptions);
                                                     }


                                         repDemandeTelework(id:any) {
                                          return this.Http.get('http://localhost:8082/demandesTelework/'+id,this.httpOptions);
                                          
                                               }
                                               repDemandeDepart(id:any) {
                                                return this.Http.get('http://localhost:8082/demandesDepart/'+id,this.httpOptions);
                                                
                                                     }
                                               getDemandeTelework(id_demandeTelework:any) {
                                                return this.Http.get('http://localhost:8082/demaneTelework/'+id_demandeTelework,id_demandeTelework)
                                                   }

                                                   getDemandeDepart(id_demandeDepart:any) {
                                                    return this.Http.get('http://localhost:8082/demaneDepart/'+id_demandeDepart,id_demandeDepart)
                                                       }

                                                   updateDemandeTelework(id_demandeTelework:any,providerToUpdate:any) {
                                                    return this.Http.patch('http://localhost:8082/updateDemandeTelework/'+id_demandeTelework,providerToUpdate,this.httpOptions);
                                                       }
                                                     

                                                       updateTiquetes(id_tiquete:any,providerToUpdate:any) {
                                                            return this.Http.patch('http://localhost:8082/updateTiquete/'+id_tiquete,providerToUpdate,this.httpOptions);
                                                               }
                                                     

                                                       updateTelework(id_demandeTelework:any,providerToUpdate:any) {
                                                        return this.Http.patch('http://localhost:8082/changeDemandeTelework/'+id_demandeTelework,providerToUpdate,this.httpOptions);
                                                           }
                                                           updateTeleworkStatus(id_demandeTelework:any,providerToUpdate:any) {
                                                            return this.Http.patch('http://localhost:8082/changestatusTelework/'+id_demandeTelework,providerToUpdate,this.httpOptions);
                                                               }

                      //DemandeDepart

                      saveDemandeDepart(data:any) {
     
                         return this.Http.post('http://localhost:8082/addDemandeDepart',data,this.httpOptions);
                             
                       }
                      //DemandeChange
                      saveDemandeChange(data:any) {
     
                        return this.Http.post('http://localhost:8082/addDemandeChange',data,this.httpOptions);
                            
                      }
                      //
                      listDemandeChange() {
                        return this.Http.get('http://localhost:8082/demandeChange',this.httpOptions);
                             }
                       repDemandeChange(id:any) {
                        return this.Http.get('http://localhost:8082/demandesChange/'+id,this.httpOptions);
                        
                             }
                             updateDemandeDepart(id_demandeDepart:any,providerToUpdate:any) {
                              return this.Http.patch('http://localhost:8082/updateDemandeDepart/'+id_demandeDepart,providerToUpdate,this.httpOptions);
                                 }
                             ///
                             
                                 updateDemandeChange(id_demandeChange:any,providerToUpdate:any) {
                                  return this.Http.patch('http://localhost:8082/updateDemandeChange/'+id_demandeChange,providerToUpdate,this.httpOptions);
                                     }

                                     updateChange(id_demandeChange:any,providerToUpdate:any) {
                                      return this.Http.patch('http://localhost:8082/changeDemandeChange/'+id_demandeChange,providerToUpdate,this.httpOptions);
                                         }
                                         updateChangeStatus(id_demandeChange:any,providerToUpdate:any) {
                                          return this.Http.patch('http://localhost:8082/changestatusChange/'+id_demandeChange,providerToUpdate,this.httpOptions);
                                             }
                                             

                                             
                                     
            Sendemail(data:any) {
                        return this.Http.post('http://localhost:8082/api/mails',data,this.httpOptions);
                        }
                                     

}
