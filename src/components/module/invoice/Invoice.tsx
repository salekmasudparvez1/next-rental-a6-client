const Invoice = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
            <p className="text-sm text-gray-500">
              Invoice ID: <span className="font-medium text-gray-700">694c62e2f698ca2065fd0b3c</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-gray-500">Issue Date</p>
              <p className="text-sm font-medium text-gray-800">24 Dec 2025</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="text-sm font-medium text-gray-800">24 Dec 2025</p>
            </div>

            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
              PAID
            </span>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Billed To</p>
            <p className="text-lg font-semibold text-gray-800">smpTest2 (Tenant)</p>
            <p className="text-sm text-gray-600">a@a.com</p>
            <p className="text-sm text-gray-600">21405029408</p>
          </div>

          <div className="md:text-right">
            <p className="text-xs text-gray-500 mb-1">Landlord</p>
            <p className="text-lg font-semibold text-gray-800">smpTest</p>
            <p className="text-sm text-gray-600">ab@ab.com</p>
            <p className="text-sm text-gray-600">1405029408</p>
          </div>
        </div>

        {/* Property */}
        <div className="mx-6 mb-6 p-4 rounded-lg border bg-gray-50">
          <p className="font-semibold text-gray-800">Student-Friendly Apartment</p>
          <p className="text-sm text-gray-600">
            University Road, Boalia, Rajshahi
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Rental Period: 16 Dec 2025 — 24 Dec 2025
          </p>
        </div>

        {/* Items */}
        <div className="px-6 overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3 text-gray-800">
                  Rent Payment (Card)
                </td>
                <td className="px-4 py-3 text-right text-gray-800">
                  $3,200.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end px-6 mt-6">
          <div className="w-full md:w-1/2 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>$3,200.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold text-lg text-gray-800">
              <span>Total</span>
              <span>$3,200.00</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 border-t text-sm text-gray-600">
          <div>
            <p>
              Payment Method: <span className="font-medium text-gray-800">Card</span>
            </p>
            <p>
              Transaction ID:{" "}
              <span className="font-medium text-gray-800">
                pi_3Si084EoCJ65v3L91XwWX53Z
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              Print
            </button>
            <button className="px-4 py-2 border rounded-md text-gray-700">
              Download
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 py-4">
          Thank you for your payment.
        </div>
      </div>
    </div>
  );
};

export default Invoice;
