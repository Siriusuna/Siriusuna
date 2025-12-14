# Storing Resource as Model
## Record-Oriented Data
_**Data whose attribute is different from each other but with the same structure.**_

If we want to store the data permanently, it has to live somewhere outside the programming language.

**We should convert it between data as stored and data as manipulating.**
![](IMG-20251214143641845.png)  
In Rails, it shall use relationship database like [SQL](SQL.md).  
![](IMG-20251214143641880.png)  

![](IMG-20251214143641921.png)

# Active Record
![](IMG-20251214143641949.png)

### Create != `new`, but `new` and `save`
`.save!` and `.create!` will throw exceptions once saving is failed.
### Read
![](IMG-20251214143641987.png)

### Update and Delete
![](IMG-20251214143642012.png)
![](IMG-20251214143642043.png)
![](IMG-20251214143642075.png)

### Summary
![](IMG-20251214143642107.png)
`update` is used more often now!

### Summary about Active Record
![](IMG-20251214143642141.png)

**What's new in Rails >= 5**
![](IMG-20251214143642190.png)
Hierarchy is good for managing classes common methods and attributes.
## Database and Migration
![](IMG-20251214143642226.png)

![](IMG-20251214143642258.png)  
`schema.rb` is a executable file which re-create the schema in another database.

Create:  
![](IMG-20251214143642292.png)  
Change:  
![](IMG-20251214143642322.png)
# Summary
![](IMG-20251214143642357.png)
