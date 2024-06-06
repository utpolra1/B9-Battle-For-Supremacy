import React from "react";
import { NavLink } from "react-router-dom";

const PaymentCard = () => {
  const price1=250;
  const price2=200;
  const price =100;
  return (
    <div className="mb-20">
      <div className="flex justify-center space-x-4 p-8 bg-gray-900 rounded-lg text-white">
        <div className="p-6 border-2 border-gray-600 rounded-lg w-64">
          <h2 className="text-lg font-semibold">Premium Individual</h2>
          <p className="mt-4 text-pink-400">FREE FOR 1 MONTH</p>
          <p className="mt-2">$100.00 per month after.</p>
          <ul className="mt-4 space-y-2">
            <li>1 Premium account</li>
            <li>Cancel anytime</li>
            <li>
              15 hours/month of listening time from our audiobooks subscriber
              catalog
            </li>
          </ul>
          <div className="flex pt-20">
            <NavLink to={`/subscription/${price}`}>
            <button className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg">Try free for 1 month</button>
          </NavLink>
          </div>
        </div>
        <div className="p-6 border-2 border-gray-600 rounded-lg w-64">
          <h2 className="text-lg font-semibold">Premium Duo</h2>
          <p className="mt-4 text-yellow-400">$200.00 per month</p>
          <ul className="mt-4 space-y-2">
            <li>2 Premium accounts</li>
            <li>Cancel anytime</li>
            <li>
              15 hours/month of listening time from our audiobooks subscriber
              catalog (plan manager only)
            </li>
          </ul>
          <div className="pt-20">
            <NavLink to={`/subscription/${price2}`}>
            <button className="mt-4 px-4 py-2 bg-yellow-300 text-white rounded-lg">Get Premium Duo</button>
          </NavLink>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            For couples who reside at the same address.
          </p>
        </div>
        <div className="p-6 border-2 border-gray-600 rounded-lg w-64">
          <h2 className="text-lg font-semibold">Premium Family</h2>
          <p className="mt-4 text-blue-400">$250.00 per month</p>
          <ul className="mt-4 space-y-2">
            <li>Up to 6 Premium or Kids accounts</li>
            <li>Block explicit music</li>
            <li>Access to Spotify Kids</li>
            <li>Cancel anytime</li>
            <li>
              15 hours/month of listening time from our audiobooks subscriber
              catalog (plan manager only)
            </li>
          </ul>
          <NavLink to={`/subscription/${price1}`}>
            <button className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg">Get Premium</button>
          </NavLink>
          <p className="mt-4 text-xs text-gray-400">
            For up to 6 family members residing at the same address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
