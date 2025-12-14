# [[RESTful Resources Routes in Rails|Routes]]
# Redirection, the Flash and the Session

![[IMG-20251214150156169.png]]

Code:  
![[IMG-20251214150156209.png]]
> If we use `redirect_to new_movies_path` instead of `render :new` in `create` method, what user filled in formerly will fade away.

The `@movie = Movie.new` in `new` is used to render the view.
# Dealing with Forms
![[IMG-20251214150156257.png]]

![[IMG-20251214150156303.png]]

## Strong Parameters
The controller decides which form field parameters are allowed to be passed to the model for update/create...why?

![[IMG-20251214150156337.png]] ^9gx3ke

_**[[MVC.md|Old-school, check for new version]]**_
# Summary
![[IMG-20251214150156396.png]]
![[IMG-20251214150156445.png]]
![[IMG-20251214150156493.png]]
