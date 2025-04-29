import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/get-order-history', {
          headers,
        });
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">No Order History</h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt="No Orders"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-full p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>

          {/* Table Header */}
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[22%]">Books</div>
            <div className="w-[45%]">Description</div>
            <div className="w-[9%]">Price</div>
            <div className="w-[16%]">Status</div>
            <div className="w-none md:w-[5%] hidden md:block">Mode</div>
          </div>

          {OrderHistory.map((items, i) => (
            <div
              key={items._id || i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
            >
              <div className="w-[3%] text-center">{i + 1}</div>
              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[45%]">{items.book.desc.slice(0, 50)}...</div>
              <div className="w-[9%]">${items.book.price}</div>
              <div className="w-[16%] font-semibold">
                {items.status === 'Order placed' ? (
                  <div className="text-yellow-500">{items.status}</div>
                ) : items.status === 'Canceled' ? (
                  <div className="text-red-500">{items.status}</div>
                ) : (
                  <div className="text-green-500">{items.status}</div>
                )}
              </div>
              <div className="w-none md:w-[5%] hidden md:block text-sm text-zinc-400">COD</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
