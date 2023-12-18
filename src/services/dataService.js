import data from '../data.json';

export const getUserList = () => {
  return Promise.resolve(data.userList);
};
export const getCompanyList = () => {
  return Promise.resolve(data.companyList);
};


export const addUser = (newUser) => {
  try {
    if (!Array.isArray(data.userList)) {
      data.userList = [];
    }

    data.userList = [...data.userList, newUser];

    return getUserList();
  } catch (error) {
    console.error('Kullanıcı eklenirken hata oluştu:', error);
    return Promise.reject(error);
  }
};

export const updateUser = (userId, updatedUserInfo) => {
  data.userList = data.userList.map((user) =>
    user.id === userId ? { ...user, ...updatedUserInfo } : user
  );

};

export const updateEmail = (userId, newEmail) => {
  updateUser(userId, { email: newEmail });
};

export const updateUserName = (userId, newName) => {
  updateUser(userId, { name: newName });
};


export const updateUserRole = (userId, newRole) => {

  data.userList = data.userList.map((user) =>
    user.id === userId ? { ...user, role: newRole } : user
  );
};

export const getUserCompanyList = () => {
  return data.userCompanyList;
};

export const updateUserCompanies = (userId, updatedCompanies) => {
  data.userCompanyList = data.userCompanyList.map((item) =>
    item.userId === userId ? { ...item, companies: updatedCompanies } : item
  );
};

export const getDataForLoggedAdmin = () => {
  return Promise.resolve(data.loggedAdmin);
};

