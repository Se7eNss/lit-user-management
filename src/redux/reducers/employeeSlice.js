const initialState = {
  common: {
    listType: 'list',
  },
  employees: [
    {
      id: 1,
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      dateOfEmployment: '2020-01-15',
      dateOfBirth: '1990-05-20',
      phone: '5551234567',
      email: 'ahmet@example.com',
      department: 'softwareDeveloper',
      position: 'junior',
    },
    {
      id: 2,
      firstName: 'Ayşe',
      lastName: 'Demir',
      dateOfEmployment: '2021-03-10',
      dateOfBirth: '1992-11-01',
      phone: '5559876543',
      email: 'ayse@example.com',
      department: 'dataAnalyst',
      position: 'medior',
    },
    {
      id: 3,
      firstName: 'Mehmet',
      lastName: 'Kaya',
      dateOfEmployment: '2019-06-22',
      dateOfBirth: '1988-09-13',
      phone: '5551112233',
      email: 'mehmet@example.com',
      department: 'projectManager',
      position: 'senior',
    },
    {
      id: 4,
      firstName: 'Elif',
      lastName: 'Çelik',
      dateOfEmployment: '2022-04-01',
      dateOfBirth: '1995-12-05',
      phone: '5559988776',
      email: 'elif@example.com',
      department: 'hrSpecialist',
      position: 'junior',
    },
    {
      id: 5,
      firstName: 'Burak',
      lastName: 'Aydın',
      dateOfEmployment: '2023-01-12',
      dateOfBirth: '1993-03-15',
      phone: '5554443322',
      email: 'burak@example.com',
      department: 'marketingSpecialist',
      position: 'medior',
    },
    {
      id: 6,
      firstName: 'Zeynep',
      lastName: 'Öztürk',
      dateOfEmployment: '2020-10-18',
      dateOfBirth: '1991-07-07',
      phone: '5556667788',
      email: 'zeynep@example.com',
      department: 'softwareDeveloper',
      position: 'senior',
    },
    {
      id: 7,
      firstName: 'Emre',
      lastName: 'Şahin',
      dateOfEmployment: '2018-08-05',
      dateOfBirth: '1987-02-24',
      phone: '5559990001',
      email: 'emre@example.com',
      department: 'dataAnalyst',
      position: 'junior',
    },
    {
      id: 8,
      firstName: 'Melis',
      lastName: 'Doğan',
      dateOfEmployment: '2019-11-29',
      dateOfBirth: '1990-06-18',
      phone: '5553332211',
      email: 'melis@example.com',
      department: 'projectManager',
      position: 'medior',
    },
    {
      id: 9,
      firstName: 'Can',
      lastName: 'Kurt',
      dateOfEmployment: '2021-02-14',
      dateOfBirth: '1994-08-20',
      phone: '5557778899',
      email: 'can@example.com',
      department: 'hrSpecialist',
      position: 'senior',
    },
    {
      id: 10,
      firstName: 'Derya',
      lastName: 'Aslan',
      dateOfEmployment: '2022-06-08',
      dateOfBirth: '1996-10-30',
      phone: '5551122334',
      email: 'derya@example.com',
      department: 'marketingSpecialist',
      position: 'junior',
    },
    {
      id: 11,
      firstName: 'Ali',
      lastName: 'Ergin',
      dateOfEmployment: '2020-05-11',
      dateOfBirth: '1989-01-10',
      phone: '5554433221',
      email: 'ali@example.com',
      department: 'softwareDeveloper',
      position: 'medior',
    },
    {
      id: 12,
      firstName: 'Nazlı',
      lastName: 'Kara',
      dateOfEmployment: '2017-09-30',
      dateOfBirth: '1985-11-17',
      phone: '5552233445',
      email: 'nazli@example.com',
      department: 'dataAnalyst',
      position: 'senior',
    },
    {
      id: 13,
      firstName: 'Barış',
      lastName: 'Yüce',
      dateOfEmployment: '2016-12-21',
      dateOfBirth: '1986-04-04',
      phone: '5553344556',
      email: 'baris@example.com',
      department: 'projectManager',
      position: 'junior',
    },
  ],
};

const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE';
const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE';
const CHANGE_LIST_TYPE = 'CHANGE_LIST_TYPE';

export function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {...state, employees: [...state.employees, action.payload]};
    case EDIT_EMPLOYEE:
      console.log(action.payload);
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case REMOVE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    case CHANGE_LIST_TYPE:
      return {
        ...state,
        common: {listType: action.payload},
      };
    default:
      return state;
  }
}

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});
export const editEmployee = (employee) => ({
  type: EDIT_EMPLOYEE,
  payload: employee,
});
export const changeListType = (type) => ({
  type: CHANGE_LIST_TYPE,
  payload: type,
});
export const removeEmployee = (id) => ({type: REMOVE_EMPLOYEE, payload: id});

export const selectAllEmployees = (state) => state.employees;
