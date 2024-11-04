import{f as H,c as r,s as e,a as n,t as g,$ as rt,F as xe,r as a,n as it}from"../chunks/disclose-version.D32A8cIq.js";import{p as ot,m as R,X as lt,Y as nt,t as C,a as st,g as t,Z as Te,$ as h,s as U,K as ut,_ as i}from"../chunks/runtime.Cmx-9IxZ.js";import{s as Z}from"../chunks/render.Dx_fi2se.js";import{i as j}from"../chunks/if.BqhT6dNd.js";import{e as ne,i as ce}from"../chunks/each.DoEVNEIz.js";import{h as dt}from"../chunks/svelte-head.DsIx1nbp.js";import{a as Ye,e as Ze}from"../chunks/forms.D4sUk8hc.js";import{a as c,r as f,s as fe}from"../chunks/attributes.MW-2LmP5.js";import{e as Ie}from"../chunks/events.CQ8HCPju.js";import{r as je}from"../chunks/misc.doaeRubg.js";import{c as P}from"../chunks/input.L8SjnS8-.js";import{b as Qe}from"../chunks/select.oKEsmhZ5.js";import{i as _t}from"../chunks/lifecycle.DAoeH_GG.js";import{p as mt}from"../chunks/props.BR7FjymL.js";import"../chunks/entry.Bc3QRP3G.js";import{g as pt}from"../chunks/itm_utils.DLiW0QTc.js";var ct=g('<tr class="svelte-1xxw7k6"><td class="svelte-1xxw7k6"> </td><td class="svelte-1xxw7k6"> </td><td class="svelte-1xxw7k6"> </td></tr>'),vt=g('<table class="svelte-1xxw7k6"><thead><tr class="svelte-1xxw7k6"><th class="svelte-1xxw7k6">Item Name</th><th class="svelte-1xxw7k6">Category</th><th class="svelte-1xxw7k6">Description</th></tr></thead><tbody></tbody></table>'),bt=g("<p>No warehouse items found.</p>"),ht=g('<section class="svelte-1xxw7k6"><h2>Warehouse Inventory</h2> <!></section>'),gt=g('<h2>New warehouse item form</h2> <form class="sendableForm svelte-1xxw7k6" method="post" action="?/submit" enctype="multipart/form-data"><input type="hidden" name="warehouseHub" value="New"> <label class="input-group" for="item_name">Item Name <input type="text" id="item_name" name="item_name" required aria-label="Item Name"></label> <label class="input-group" for="description">Description <textarea id="description" name="description" required aria-label="Item Description"></textarea></label> <label class="input-group" for="price">Item Price <input type="number" id="price" name="price" required aria-label="Item Price"></label> <label class="input-group" for="category">Item Category <input type="text" id="category" name="category" required aria-label="Item Category"></label> <button class="W-button svelte-1xxw7k6" type="submit">Submit</button></form>',1),xt=g("<option> </option>"),ft=g("<option> </option>"),yt=g('<h2>Amount</h2> <form class="sendableForm svelte-1xxw7k6" method="post" action="?/submit" enctype="multipart/form-data"><input type="hidden" name="warehouseHub" value="Amount"> <label for="product_id">Product</label> <select class="selector svelte-1xxw7k6" name="product_id" required aria-label="Product Selection"><option>-- select a product --</option><!></select> <label for="size_id">Size</label> <select class="selector svelte-1xxw7k6" name="size_id" required aria-label="Size Selection"><option>-- select a size --</option><!></select> <label class="input-group" for="quantity">Quantity <input type="number" id="quantity" name="quantity" required aria-label="Quantity"></label> <label class="input-group" for="item_location">Location <input type="text" id="item_location" name="item_location" required aria-label="Item Location"></label> <label class="input-group" for="reorder_threshold">Reorder Threshold <input type="number" id="reorder_threshold" name="reorder_threshold" required aria-label="Reorder Threshold"></label> <button class="W-button svelte-1xxw7k6" type="submit">Submit</button></form>',1),wt=g("<option> </option>"),It=g('<h2>Gallery</h2> <form class="sendableForm svelte-1xxw7k6" method="post" action="?/submit" enctype="multipart/form-data"><input type="hidden" name="warehouseHub" value="Gallery"> <label for="product_id">Product</label> <select class="selector svelte-1xxw7k6" name="product_id" required aria-label="Product Selection"><option>-- select a product --</option><!></select> <label for="item_images">Item Images</label> <input type="file" id="item_images" name="item_images" multiple aria-label="Item Image"> <input type="hidden" name="product_name"> <button class="W-button svelte-1xxw7k6" type="submit">Submit</button></form>',1),kt=g("<option> </option>"),qt=g('<div class="inventory-row svelte-1xxw7k6"><input type="hidden" name="warehouseHub" value="Edit"> <input type="hidden" name="inventory_ids[]"> <label class="input-group svelte-1xxw7k6">Quantity for <span> </span> <input type="number" name="quantities[]" required></label> <label class="input-group svelte-1xxw7k6">Item Location <input type="text" name="item_locations[]" aria-label="Item Location"></label> <label class="input-group svelte-1xxw7k6">Reorder Threshold <input type="number" name="reorder_thresholds[]" required aria-label="Reorder Threshold"></label></div>'),zt=g("<h3>Inventory Data:</h3> <!>",1),$t=g('<div class="image-card svelte-1xxw7k6"><img class="svelte-1xxw7k6"> <p class="svelte-1xxw7k6"> </p> <label><input type="checkbox" name="delete_images[]"> Select to delete</label></div>'),Pt=g('<h3>Images:</h3> <div class="image-grid radio-group svelte-1xxw7k6"></div>',1),Nt=g('<h2>Edit warehouse item</h2> <form class="sendableForm svelte-1xxw7k6" method="post" action="?/submit" enctype="multipart/form-data"><input type="hidden" name="warehouseHub" value="Edit"> <label for="product_id">Product</label> <select class="selector svelte-1xxw7k6" name="product_id" required aria-label="Product Selection"><option>-- select a product --</option><!></select> <input type="hidden" name="product_name"> <label class="input-group" for="item_name">Item Name <input id="item_name" name="item_name" required></label> <label class="input-group" for="description">Item Description <textarea id="description" name="description" required aria-label="Item Description"></textarea></label> <label class="input-group" for="price">Price <input type="number" id="price" name="price" required aria-label="Item Price"></label> <label class="input-group" for="category">Category <input type="text" id="category" name="category" required aria-label="Item Category"></label> <!> <!> <button class="W-button svelte-1xxw7k6" type="submit">Submit</button></form>',1),At=g('<header class="head_Line"><h1>The Warehouse Floor</h1></header> <section class="svelte-1xxw7k6"><select class="selector svelte-1xxw7k6"><option>-- select a warehouse operation --</option><option>View Warehouse</option><option>New Item</option><option>Add Amount</option><option>Add Images</option><option>Edit item</option></select></section> <!>',1);function Xt(Be,Re){ot(Re,!1);let ke=mt(Re,"data"),ve=ke(),Ve=R(ve.session),X=R(ve.productData),qe=R(ve.productInventory),se=R(ve.sizeData),ze=R(ve.images);new FormData;let $e=!1,ae,ye,B=R(""),ue=R(""),Pe=R({}),N=R({product_id:"",item_name:" ",description:"",price:"",category:""}),o=R({product_id:"",size_id:"",quantity:"",reorder_threshold:"",item_location:""}),u=R({product_id:"",size_id:"",item_name:"",description:"",price:"",category:"",quantity:"",reorder_threshold:"",item_location:"",images:[]});async function Oe(){ye=t(se).find(l=>l.size_id===t(o).size_id),ae=t(X).find(l=>l.product_id===t(o).product_id),h(o,t(o).item_location=(ye==null?void 0:ye.size_name)??""),h(o,t(o).reorder_threshold=(ae==null?void 0:ae.reorder_threshold)??""),h(o,t(o).quantity=(ae==null?void 0:ae.quantity)??"")}function Je(l){const _=l.target.options[l.target.selectedIndex];U(ue,_.getAttribute("data-name")),console.log("Selected Product Name:",t(ue))}async function Me(l){const _=l.target.options[l.target.selectedIndex],J=_.getAttribute("data-name"),re=_.getAttribute("data-description"),L=_.getAttribute("data-price"),G=_.getAttribute("data-category"),A=_.getAttribute("data-item_location"),z=_.getAttribute("data-image"),S=_.value,I=await pt(J,t(ze));U(u,{...t(u),product_id:S,item_name:J,description:re,price:L,item_location:A,images:I?[...I,z]:[z],category:G}),U(Pe,[...t(qe).filter(x=>x.product_id===parseInt(S))])}function Ke(l){const _=t(se).find(J=>J.size_id===l);return _?_.size_name:"Unknown Size"}lt(()=>(t(Ve),t(X),t(qe),t(se),t(ze),ut(ke())),()=>{(()=>{const l=ke();return U(Ve,l.session),U(X,l.productData),U(qe,l.productInventory),U(se,l.sizeData),U(ze,l.images),l})()}),nt(),_t();var Ue=At();dt(l=>{rt.title="Warehouse inventory edit page"});var Ne=H(Ue);r(Ne),a(Ne);var Ae=e(e(Ne,!0)),Se=r(Ae);C(()=>{t(B),Te(()=>{})});var De=r(Se);De.value=((De.__value="")==null,"");var Fe=e(De);Fe.value=(Fe.__value="View")==null?"":"View";var We=e(Fe);We.value=(We.__value="New")==null?"":"New";var Ee=e(We);Ee.value=(Ee.__value="Amount")==null?"":"Amount";var He=e(Ee);He.value=(He.__value="Gallery")==null?"":"Gallery";var Xe=e(He);Xe.value=(Xe.__value="Edit")==null?"":"Edit",a(Se),a(Ae);var et=e(e(Ae,!0));j(et,()=>t(B)==="View",l=>{var _=ht(),J=r(_),re=e(e(J,!0));j(re,()=>t(X).length>0,L=>{var G=vt(),A=r(G),z=r(A),S=r(z),I=e(S);e(I),a(z),a(A);var x=e(A);ne(x,9,()=>t(X),ce,(V,m,D)=>{var $=ct(),v=r($),s=r(v);a(v);var T=e(v),O=r(T);a(T);var F=e(T),K=r(F);a(F),a($),C(()=>{Z(s,i(m).item_name),Z(O,i(m).category),Z(K,i(m).description)}),n(V,$)}),a(x),a(G),n(L,G)},L=>{var G=bt();n(L,G)}),a(_),n(l,_)},l=>{var _=xe(),J=H(_);j(J,()=>t(B)==="New",re=>{var L=gt(),G=H(L),A=e(e(G,!0)),z=r(A),S=e(e(z,!0)),I=e(r(S));f(I),a(S);var x=e(e(S,!0)),V=e(r(x));je(V),a(x);var m=e(e(x,!0)),D=e(r(m));f(D),a(m);var $=e(e(m,!0)),v=e(r($));f(v),a($),e(e($,!0)),a(A),P(I,()=>t(N).item_name,s=>h(N,t(N).item_name=s)),P(V,()=>t(N).description,s=>h(N,t(N).description=s)),P(D,()=>t(N).price,s=>h(N,t(N).price=s)),P(v,()=>t(N).category,s=>h(N,t(N).category=s)),n(re,L)},re=>{var L=xe(),G=H(L);j(G,()=>t(B)==="Amount",A=>{var z=yt(),S=H(z),I=e(e(S,!0)),x=r(I),V=e(e(x,!0)),m=e(e(V,!0));C(()=>{t(o).product_id,Te(()=>{t(X)})});var D=r(m);D.value=((D.__value="")==null,"");var $=e(D);ne($,1,()=>t(X),ce,(d,k,be)=>{var q=xt(),M={},de=r(q);a(q),C(()=>{M!==(M=i(k).product_id)&&(q.value=(q.__value=i(k).product_id)==null?"":i(k).product_id),Z(de,i(k).item_name)}),n(d,q)}),a(m);var v=e(e(m,!0)),s=e(e(v,!0));C(()=>{t(o).size_id,Te(()=>{t(se)})});var T=r(s);T.value=((T.__value="")==null,"");var O=e(T);ne(O,1,()=>t(se),ce,(d,k,be)=>{var q=ft(),M={},de=r(q);a(q),C(()=>{M!==(M=i(k).size_id)&&(q.value=(q.__value=i(k).size_id)==null?"":i(k).size_id),Z(de,i(k).size_name)}),n(d,q)}),a(s);var F=e(e(s,!0)),K=e(r(F));f(K),a(F);var Y=e(e(F,!0)),W=e(r(Y));f(W),a(Y);var E=e(e(Y,!0)),ie=e(r(E));f(ie),a(E);var Q=e(e(E,!0));c(Q,"aria-busy",$e),a(I),Qe(m,()=>t(o).product_id,d=>h(o,t(o).product_id=d)),Ie("change",m,Oe,!1),Qe(s,()=>t(o).size_id,d=>h(o,t(o).size_id=d)),Ie("change",s,Oe,!1),P(K,()=>t(o).quantity,d=>h(o,t(o).quantity=d)),P(W,()=>t(o).item_location,d=>h(o,t(o).item_location=d)),P(ie,()=>t(o).reorder_threshold,d=>h(o,t(o).reorder_threshold=d)),n(A,z)},A=>{var z=xe(),S=H(z);j(S,()=>t(B)==="Gallery",I=>{var x=It(),V=H(x),m=e(e(V,!0)),D=r(m),$=e(e(D,!0)),v=e(e($,!0)),s=r(v);s.value=((s.__value="")==null,"");var T=e(s);ne(T,1,()=>t(X),ce,(W,E,ie)=>{var Q=wt(),d={},k=r(Q);a(Q),C(()=>{d!==(d=i(E).product_id)&&(Q.value=(Q.__value=i(E).product_id)==null?"":i(E).product_id),c(Q,"data-name",i(E).item_name),Z(k,i(E).item_name)}),n(W,Q)}),a(v);var O=e(e(v,!0)),F=e(e(O,!0)),K=e(e(F,!0));f(K);var Y=e(e(K,!0));c(Y,"aria-busy",$e),a(m),Ye(m,W=>Ze(W)),Ie("change",v,Je,!1),P(K,()=>t(ue),W=>U(ue,W)),n(I,x)},I=>{var x=xe(),V=H(x);j(V,()=>t(B)==="Edit",m=>{var D=Nt(),$=H(D),v=e(e($,!0)),s=r(v),T=e(e(s,!0)),O=e(e(T,!0)),F=r(O);F.value=((F.__value="")==null,"");var K=e(F);ne(K,1,()=>t(X),ce,(b,y,we)=>{var w=kt(),ee={},p=r(w);a(w),C(()=>{ee!==(ee=i(y).product_id)&&(w.value=(w.__value=i(y).product_id)==null?"":i(y).product_id),c(w,"data-name",i(y).item_name),c(w,"data-description",i(y).description),c(w,"data-price",i(y).price),c(w,"data-category",i(y).category),c(w,"data-item_location",i(y).item_location),Z(p,i(y).item_name)}),n(b,w)}),a(O);var Y=e(e(O,!0));f(Y);var W=e(e(Y,!0)),E=e(r(W));f(E),a(W);var ie=e(e(W,!0)),Q=e(r(ie));je(Q),a(ie);var d=e(e(ie,!0)),k=e(r(d));f(k),a(d);var be=e(e(d,!0)),q=e(r(be));f(q),a(be);var M=e(e(be,!0));j(M,()=>t(Pe).length>0,b=>{var y=zt(),we=H(y),w=e(e(we,!0));ne(w,1,()=>t(Pe),ce,(ee,p,at)=>{var _e=qt(),Ce=r(_e),he=e(e(Ce,!0));f(he);var te=e(e(he,!0)),oe=e(r(te)),ge=r(oe);C(()=>Z(ge,Ke(i(p).size_id))),a(oe);var me=e(e(oe,!0));f(me),C(()=>c(me,"aria-label",`Quantity for ${Ke(i(p).size_id)??""}`)),a(te);var le=e(e(te,!0)),pe=e(r(le));f(pe),a(le);var Le=e(e(le,!0)),Ge=e(r(Le));f(Ge),a(Le),a(_e),C(()=>{fe(he,i(p).inventory_id),c(te,"for",`quantity_${i(p).size_id??""}`),c(me,"id",`quantity_${i(p).size_id??""}`),fe(me,i(p).quantity),c(le,"for",`item_location_${i(p).size_id??""}`),c(pe,"id",`item_location_${i(p).size_id??""}`),fe(pe,i(p).item_location),c(Le,"for",`reorder_threshold_${i(p).size_id??""}`),c(Ge,"id",`reorder_threshold_${i(p).size_id??""}`),fe(Ge,i(p).reorder_threshold)}),n(ee,_e)}),n(b,y)});var de=e(e(M,!0));j(de,()=>t(u).images&&t(u).images.length>0,b=>{var y=Pt(),we=H(y),w=e(e(we,!0));ne(w,13,()=>t(u).images,(ee,p)=>ee,(ee,p,at)=>{var _e=xe(),Ce=H(_e);j(Ce,()=>i(p),he=>{var te=$t(),oe=r(te),ge=e(e(oe,!0)),me=r(ge);a(ge);var le=e(e(ge,!0)),pe=r(le);f(pe),it(),a(le),a(te),C(()=>{c(oe,"src",i(p)),c(oe,"alt",t(ue)),Z(me,t(ue)),fe(pe,i(p))}),n(he,te)}),n(ee,_e)}),a(w),n(b,y)});var tt=e(e(de,!0));c(tt,"aria-busy",$e),a(v),Ye(v,b=>Ze(b)),Ie("change",O,Me,!1),P(Y,()=>t(u).item_name,b=>h(u,t(u).item_name=b)),P(E,()=>t(u).item_name,b=>h(u,t(u).item_name=b)),P(Q,()=>t(u).description,b=>h(u,t(u).description=b)),P(k,()=>t(u).price,b=>h(u,t(u).price=b)),P(q,()=>t(u).category,b=>h(u,t(u).category=b)),n(m,D)},null,!0),n(I,x)},!0),n(A,z)},!0),n(re,L)},!0),n(l,_)}),Qe(Se,()=>t(B),l=>U(B,l)),n(Be,Ue),st()}export{Xt as component};
