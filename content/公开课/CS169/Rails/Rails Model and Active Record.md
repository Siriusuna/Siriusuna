# Storing Resource as Model
## Record-Oriented Data
_**Data whose attribute is different from each other but with the same structure.**_

If we want to store the data permanently, it has to live somewhere outside the programming language.

**We should convert it between data as stored and data as manipulating.**
![[IMG-20251214150157783.png]]  
In Rails, it shall use relationship database like [[SQL]].  
![[IMG-20251214150157809.png]]  

![[IMG-20251214150157874.png]]

# Active Record
![[IMG-20251214150157921.png]]

### Create != `new`, but `new` and `save`
`.save!` and `.create!` will throw exceptions once saving is failed.
### Read
![[IMG-20251214150157960.png]]

### Update and Delete
![[IMG-20251214150157994.png]]
![[IMG-20251214150158031.png]]
![[IMG-20251214150158080.png]]

### Summary
![[IMG-20251214150158110.png]]
`update` is used more often now!

### Summary about Active Record
![[IMG-20251214150158141.png]]

**What's new in Rails >= 5**
![[IMG-20251214150158186.png]]
Hierarchy is good for managing classes common methods and attributes.
## Database and Migration
![[IMG-20251214150158222.png]]

![[IMG-20251214150158294.png]]  
`schema.rb` is a executable file which re-create the schema in another database.

Create:  
![[IMG-20251214150158330.png]]  
Change:  
![[IMG-20251214150158361.png]]
# Summary
![[IMG-20251214150158398.png]]
