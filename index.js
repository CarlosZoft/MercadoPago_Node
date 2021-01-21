const express = require('express');
const app = express();
const MercadoPago = require("mercadopago");

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-5818874060504009-012117-34dfce4510e7530dc7184bcea7777ee5-611498066"
})
app.get("/", (req,res)=>{
    res.send("Home")
})

app.get("/pagar", async (req,res)=>{
    var id = "" + Date.now();
    var email = "carlosk2gunn@gmail.com";
    var data = {
        items : [
            item = {
                id: id,
                title: "Caneca",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(20)
            }
        ],
        payer:{
            email: email,
        },
        external_reference: id    
    }
    try{
        var pagamento = await MercadoPago.preferences.create(data);
        console.log(pagamento);
        return res.redirect(pagamento.body.init_point)
    }
    catch(err){
        console.error(err);
    }

})
app.listen(3030,(req,res) =>{
    console.log("app running");
})
