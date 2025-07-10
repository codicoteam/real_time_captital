import axios from 'axios';

const AdminService = {
  getAllAdmins: async (token: string) => {
    try {
      const response = await axios.get(
        'https://loan-backend-qnj0.onrender.com/api/v1/admin_route/getall',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default AdminService;