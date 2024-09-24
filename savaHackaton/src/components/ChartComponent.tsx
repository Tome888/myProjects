import React, { useState } from 'react';
import pfpImg from '../assets/photos/pfp img.png';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const dataLastAct = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: '#839E99',
      borderRadius: 20,
    },
    {
      label: 'Dataset 2',
      data: [28, 48, 40, 19, 86, 27, 90],
      backgroundColor: '#01A180',
      borderRadius: 20,
    },
    {
      label: 'Dataset 3',
      data: [18, 48, 77, 9, 100, 27, 40],
      backgroundColor: '#55D1B9',
      borderRadius: 20,
    }
  ]
};

const dataActive = [20, 30, 10, 25, 15]
const dataInactive = [-10, -15, -5, -20, -12]
const dataPositive = dataInactive.map(number => Math.abs(number));
const monthsActive = ['January', 'February', 'March', 'April', 'May']

const data = {
    labels: monthsActive,
    datasets: [
      {
        label: 'Активни',
        data: dataActive,
        backgroundColor: '#01A180',
        borderRadius: 50,
        barThickness: 20,
      },
      {
        label: 'Неактивни',
        data: dataInactive,
        backgroundColor: '#ff4848',
        borderRadius: 50,
        barThickness: 20,
      },
    ],
  };
  
  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (value:any) {
            return value >= 0 ? '+' + value : value;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context:any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y >= 0 ? '+' + context.parsed.y : context.parsed.y;
            }
            return label;
          },
        },
      },
    },
  };

export function ChartComponent() {
  const [chartType, setChartType] = useState('Статистика на полиси');
  const [selectedMonth, setSelectedMonth ]= useState(0)

  const changeChart = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value);
  };

  const changeActiveBars= (event: any)=>{
    setSelectedMonth(event.target.value);
  }

  return (
    <div className="chartMainWrapper">
      <div className='wrapperLeft'>
      <div className='pfpImgWrapper'>
        <img src={pfpImg} alt="" />
        <p>Име Презиме</p>
      </div>
      <div className="selectTwo">

        <select className='selectChart' onChange={changeChart} name="" id="">
          <option value='Статистика на полиси'>Статистика на полиси</option>
          <option value='Последна активност'>Последна активност</option>
        </select>
        <select className='selectChart mright-2' >
          <option value="jan2may">Јан - Мај</option>
        </select>
      </div>
        {chartType === 'Статистика на полиси' ? (
          <div className='statsPolicWrapper'>
            <Bar data={data} options={options} />
            <div>
                <select className='selectChart' onChange={(event) => changeActiveBars(event)} name="" id="">
                    <option value={0}>January</option>
                    <option value={1}>February</option>
                    <option value={2}>March</option>
                </select>
                <div>
                <p>Активни</p>
                <div className="progress" style={{backgroundColor: 'transparent',border: '1px solid gray', height:'30px'}} role="progressbar" aria-label="Basic example" aria-valuenow={dataActive[selectedMonth]} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-bar" style={{ width: `${dataActive[selectedMonth]}%`, backgroundColor: '#01A180' }}></div>
                </div>
                <p>Неактивни</p>
                <div className="progress" style={{backgroundColor: 'transparent', border: '1px solid gray', height:'30px'}} role="progressbar" aria-label="Basic example" aria-valuenow={dataPositive[selectedMonth]} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-bar" style={{ width: `${dataPositive[selectedMonth]}%`, backgroundColor: '#ff4848'}}></div>
                </div>
                </div>
            </div>
          </div>
        ) : (
          <div className='lastActivityWrapper'>
            <Bar data={dataLastAct} options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }} />
            <p>Патничко осигурување</p>
            <div className="progress" style={{backgroundColor: 'transparent', border: '1px solid gray', height:'30px'}} role="progressbar" aria-label="Basic example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar" style={{ width: '25%', backgroundColor: '#839E99' }}></div>
            </div>
            <p>Велосипедско осигурување</p>
            <div className="progress" style={{backgroundColor: 'transparent', border: '1px solid gray', height:'30px'}} role="progressbar" aria-label="Basic example" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-bar" style={{ width: '50%', backgroundColor: '#01A180'}}></div>
            </div>
            <p>Домаќинско осигурување</p>
            <div className="progress" style={{backgroundColor: 'transparent', border: '1px solid gray', height:'30px'}} role="progressbar" aria-label="Basic example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-bar" style={{ width: '75%', backgroundColor: '#55D1B9'}}></div>
            </div>

          </div>
        )}
        
      </div>
      <div className='wrapperRight'>

      <div className='wrapperBadges'>
        <div className='badge'>
            <p style={{color: '#01A180', fontSize: '32px'}}>8</p>
            <p>Во тек</p>
        </div>
        <div className='badge'>
        <p style={{color: '#01A180', fontSize: '32px'}}>12</p> 
        <p>Завршени</p>
        </div>
        <div className='badge'>
         <p style={{color: '#01A180', fontSize: '32px'}}>2</p>
         <p>За обнова</p>
        </div>
      </div>
      </div>
    </div>
  );
}



//vo tek, zavrseni, obnova