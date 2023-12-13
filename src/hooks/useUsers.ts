import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";


const useUsers = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);
    const {request, cancel} = userService.getAll<User>();
      request.then(res => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch(err => {
        if(err instanceof CanceledError) return;
        setErrors(err.message)
        setLoading(false)
      })

    return () => cancel();
  }, []) 

  return { users, errors, loading, setUsers, setErrors}

}

export default useUsers;