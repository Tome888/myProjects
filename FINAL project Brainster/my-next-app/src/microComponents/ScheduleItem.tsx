interface ScheduleItemProps {
  time: string | number;
  title: string;
  presenter: string | null;
  desc: string | null;
  cusClass?: string;
}

function ScheduleItem({
  time,
  title,
  desc,
  cusClass,
  presenter,
}: ScheduleItemProps) {
  return (
    <div className={`schedule-item ${cusClass}`}>
      <div className="time">{time}</div>
      <div className="event">
        <h3>{title}</h3>
        <ul>
          {presenter && <li>{presenter}</li>}
          {desc && <li>{desc}</li>}
        </ul>
      </div>
    </div>
  );
}

export default ScheduleItem;
