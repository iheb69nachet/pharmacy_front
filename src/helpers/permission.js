export function hasPermission(permissionName) {
    let user=localStorage.getItem("user")
    if(user){
        user=JSON.parse(user)
        // Check if the user has any roles
        if (!user.roles || user.roles.length === 0) {
          return false;
        }
      
        // Loop through each role
        for (const role of user.roles) {
          // Check if the role has any permissions
          if (role.permissions && role.permissions.length > 0) {
            // Loop through each permission in the role
            for (const permission of role.permissions) {
              // Check if the permission name matches
              if (permission.name === permissionName) {
                return true;
              }
            }
          }
        }
      
    }
    // If no matching permission was found, return false
    return false;
  }