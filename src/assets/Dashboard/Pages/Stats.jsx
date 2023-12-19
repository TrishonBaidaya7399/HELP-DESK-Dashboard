// import PropTypes from 'prop-types';

const DashboardHome = () => {
    return (
        <div className=" mb-auto mt-6">
            <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
            <div className="card-section flex gap-4 mt-6">
                <div className="card rounded-lg bg-[#2F82FF] w-[200px] flex justify-center items-center p-5">
                <h1 className="text-xl text-[#05386B] font-bold">Total Tickets</h1>
                <h1 className="text-6xl font-bold text-[#05386B]">12</h1>
                </div>
                <div className="card rounded-lg bg-[#0BFF68] w-[200px] flex justify-center items-center p-5">
                <h1 className="text-xl text-[#05386B] font-bold">Total Solved</h1>
                <h1 className="text-6xl font-bold text-[#05386B]">8</h1>
                </div>
                <div className="card rounded-lg bg-[#FE594E] w-[200px] flex justify-center items-center p-5">
                <h1 className="text-xl text-[#05386B] text-center font-bold">Total Awaiting Approval</h1>
                <h1 className="text-6xl font-bold text-[#05386B]">2</h1>
                </div>
                <div className="card rounded-lg bg-[#FCFF6C] w-[200px] flex justify-center items-center p-5">
                <h1 className="text-xl text-[#05386B] font-bold">Total in Progress</h1>
                <h1 className="text-6xl font-bold text-[#05386B]">12</h1>
                </div>
            </div>
        </div>
    );
};

DashboardHome.propTypes = {
    
};

export default DashboardHome;