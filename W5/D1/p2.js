const items={
    item1:"Laptop",
    item2:"cloudAPI",
    item3:"Server"
};

for(const [item,itemName] of Object.entries(items)){
    console.log(`${item}:${itemName}`);
}