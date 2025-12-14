# [Routes](RESTful%20Resources%20Routes%20in%20Rails.md)
# Redirection, the Flash and the Session

![](IMG-20251213231152472.png)

Code:  
![](IMG-20251213231152680.png)
> If we use `redirect_to new_movies_path` instead of `render :new` in `create` method, what user filled in formerly will fade away.

The `@movie = Movie.new` in `new` is used to render the view.
# Dealing with Forms
![](IMG-20251213231153620.png)

![](IMG-20251213231154790.png)

## Strong Parameters
The controller decides which form field parameters are allowed to be passed to the model for update/create...why?

![](IMG-20251213231155830.png) ^9gx3ke

_**[Old-school, check for new version](MVC.md)**_
# Summary
![](IMG-20251213231156747.png)
![](IMG-20251213231157651.png)
![](IMG-20251213231158486.png)
