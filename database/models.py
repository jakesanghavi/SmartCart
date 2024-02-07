from datetime import datetime

class Store:
    def __init__(
        self, 
        name: str, 
        zipcode: str = "", 
        logo_url: str = "",
        id: str = ""
    ):
        self.name: str = name
        self.zipcode: str = zipcode
        self.logo_url: str = logo_url
        self.id: str = id
        
        
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "zipcode": self.zipcode,
            "logo_url": self.logo_url
        }
    
    def to_dict_no_id(self):
        return {
            "name": self.name,
            "zipcode": self.zipcode,
            "logo_url": self.logo_url
        }

class Item:
    def __init__(
        self, 
        name: str,
        id: str = ""
    ):
        self.name: str = name
        self.id: str = id
        
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
        
    def to_dict_no_id(self):
        return {
            "name": self.name
        }

class ItemPrice:
    def __init__(
        self, 
        item_id: str, 
        store_id: str, 
        price: float, 
        quantity: float, 
        unit: str, 
        datetime: str, 
        image_url: str = "",
        id: str = ""
    ):
        self.id = id
        self.item_id = item_id
        self.store_id = store_id
        self.price = price
        self.quantity = quantity
        self.unit = unit
        self.date = datetime
        self.image_url = image_url
        
    def to_dict(self):
        return {
            ""
            "item_id": self.item_id,
            "store_id": self.store_id,
            "price": self.price,
            "quantity": self.quantity,
            "unit": self.unit,
            "date": self.date,
            "image_url": self.image_url
        }
        
    def to_dict_no_id(self):
        return {
            "item_id": self.item_id,
            "store_id": self.store_id,
            "price": self.price,
            "quantity": self.quantity,
            "unit": self.unit,
            "date": self.date,
            "image_url": self.image_url
        }

class Tag:
    def __init__(
        self, 
        name: str,
        id: str = ""
    ):
        self.name: str = name
        self.id: str = id
        
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
        
    def to_dict_no_id(self):
        return {
            "name": self.name
        }

class ItemPriceTags:
    def __init__(
        self, 
        tag_id: str, 
        item_price_id: str,
        id: str = ""
    ):
        self.tag_id: str = tag_id
        self.item_price_id: str = item_price_id
        self.id: str = id
    
    def to_dict(self):
        return {
            "id": self.id,
            "tag_id": self.tag_id,
            "item_price_id": self.item_price_id
        }
    
    def to_dict_no_id(self):
        return {
            "tag_id": self.tag_id,
            "item_price_id": self.item_price_id
        }

class ScraperObject:
    def __init__(
        self, 
        store_name: str, 
        item_name: str, 
        item_price: float, 
        item_quantity: float, 
        item_unit: str, 
        datetime: str = datetime.now(), 
        tags: list[str] = [], 
        image_url: str = ""
    ):
        self.store_name: str = store_name
        self.item_name: str = item_name
        self.item_price: float = item_price
        self.item_quantity: float = item_quantity
        self.item_unit: str = item_unit
        self.datetime: str = datetime
        self.tags: list[str] = tags
        self.image_url: str = image_url
        
    def to_dict(self):
        return {
            "id": self.id,
            "store_name": self.store_name,
            "item_name": self.item_name,
            "item_price": self.item_price,
            "item_quantity": self.item_quantity,
            "item_unit": self.item_unit,
            "datetime": self.datetime,
            "tags": self.tags,
            "image_url": self.image_url
        }
    
    def to_dict_no_id(self):
        return {
            "store_name": self.store_name,
            "item_name": self.item_name,
            "item_price": self.item_price,
            "item_quantity": self.item_quantity,
            "item_unit": self.item_unit,
            "datetime": self.datetime,
            "tags": self.tags,
            "image_url": self.image_url
        }
        

