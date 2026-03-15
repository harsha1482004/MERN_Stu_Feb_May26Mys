function invoice(gstRate = 0.18, ...items){
  let sub=0;
  for (let i=0;i<items.length;i++){
    let item = items[i];
    if(item.name==="STOP"){
      break;
    }
    if(item.price<=0||item.qty<=0){
      continue;
    }
    sub=sub+(item.price * item.qty);
  }
  let gst=sub*gstRate;
  let total=sub+gst;
  return{
    sub,gst,total
  };
}
console.log(invoice(0.18,{name:"Pen",price:10,qty:3}));

