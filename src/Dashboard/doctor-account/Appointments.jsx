import { formateDate } from "../../utils/formateDate";
const Appointments = ({ appointments }) => {
  return (
    <table className="w-full text-left text-sm text-gray-700 bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-10 py-3">
            Booked on
          </th>
          <th scope="col" className="px-6 py-3">
            Appointment date
          </th>
          <th scope="col" className="px-6 py-3">
            Time Slot
          </th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map(item => (
          <tr key={item._id} className="hover:bg-blue-50 transition-colors">
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
            >
              <img
                src={item.user.photo}
                className="w-10 h-10 rounded-full border-2 border-blue-200 object-cover shadow-sm"
                alt=""
              />
              <div className="pl-3">
                <div className="text-base font-semibold text-gray-900">{item.user.name}</div>
                <div className="text-sm text-gray-500">{item.user.email}</div>
              </div>
            </th>

            <td className="px-6 py-4">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${item.user.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>{item.user.gender}</span>
            </td>
            <td className="px-6 py-4">
              {item.isPaid ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2 inline-block"></span>
                  Paid
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-2 inline-block"></span>
                  Unpaid
                </span>
              )}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900">{item.ticketPrice}</td>
            <td className="px-6 py-4 text-xs text-gray-500">{formateDate(item.createdAt)}</td>
            <td className="px-6 py-4 text-xs text-gray-500">{formateDate(item.appointmentDate)}</td>
            <td className="px-6 py-4">
              <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold border border-blue-200">
                {item.slot}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;