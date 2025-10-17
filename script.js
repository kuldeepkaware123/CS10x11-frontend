
const api = "http://localhost:5000/product";

// CREATE PRODUCT
async function addproduct() {
  const name = document.querySelector("#pname").value;
  const price = Number(document.querySelector("#pprice").value);
  const img = document.querySelector("#pimg").value;

  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, img }),
  });
  document.querySelector("#pname").value = "";
  document.querySelector("#pprice").value = "";
  document.querySelector("#pimg").value = "";

  alert("product has been added");

  showproduct();
  showptable()
}

// SHOW PRODUCT
async function showproduct() {
  const res = await fetch(api);
  const data = await res.json();

  let output = "";

  data.forEach((element) => {
    output += `
           <div class="product_card">
                <img src=${element.img} alt="" width="75" height= "100"
                >
                <h4>${element.name}</h4>
                <h4>${element.price}</h4>
            </div>
          `;
  });
  document.querySelector("#output").innerHTML = output;

  
}
// SHOW PRODUCT ON DASHBORAD
async function showptable() {
  const res = await fetch(api);
  const data = await res.json();
   
  let ptable = "";
  
  data.forEach((element) => {
    ptable += `
           <tr>
               <td>
               <img src=${element.img} alt="" width="20" height= "20">
               </td>
               <td>
                ${element.name}
               </td>
               <td>
              ${element.price}
               </td>
               <td>
                <button onclick="deleteproduct('${element._id}')">❌ delete </button>

               </td>
               <td>
                <button onclick="updateproduct('${element._id}')">✏️ edit </button>

               </td>
            </tr>
          `;
  });
  document.querySelector("#ptable").innerHTML = ptable;

}

// UPDATE PRODUCT

      async function  updateproduct(id) {

        const newname = prompt("enter new name");
        const newprice = prompt("enter new price");

        await fetch(api + "/" + id,{
            method:"PUT",
            headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ name:newname,price:newprice}),
        })

        showptable()
        
      }

  //   delete product
  
      async function deleteproduct(id) {
        await fetch(api + "/" + id, { method: "DELETE" });
        showptable();
      }


showproduct();

showptable()
