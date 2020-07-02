export const append = (id, list, listMenu)=>{
    console.log(listMenu);
    if(checkExsit(id,listMenu))
    {
        return true
    }
    for(var i = 0; i< list.length;i++)
    {
        
        if(list[i].IdMenu == id)
        {
            var menu = {};
            menu.IdMenu = list[i].IdMenu;
            menu.NameMenu = list[i].NameMenu;
            menu.Quantity = 1;
            menu.Price = list[i].Price;
            menu.TotalPrice = list[i].Price;
            console.log(menu);
            return menu;
        }
    }
}


export const changequantity = (id, value, list) =>{
    console.log(value)
    console.log(value);
    var newList = [...list]
    for(var i = 0; i < newList.length; i++)
    {
        if(newList[i].IdMenu == id)
        {
            newList[i].Quantity = value;
            newList[i].TotalPrice = Number(newList[i].Price) * Number(value);
            return newList;
        }

    }
    return newList
}

export const deleteMenu = (id, list) =>{
    
    var newList = [...list]
    for(var i = 0; i < newList.length; i++)
    {
        if(newList[i].IdMenu == id)
        {
            newList.splice(i, 1)
            return newList;
        }

    }
    return newList
}
function checkExsit(id, listmenu){
for(var i = 0; i< listmenu.length ; i++)
{
    if(listmenu[i].IdMenu==id)
    {
        return true;
    }
    
}
return false
}