import { GetListData } from '@/components/entities/calls';
import { getRecord } from '@/components/entities/calls/actions/getRecord';
import CallArrow from '@/components/shared/icons/CallArrow';
import { Avatar, Badge } from '@/components/shared/ui';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  formatPhoneNumber,
  getRandomVariant,
  formatDuration,
  formatTime,
  groupCallsByDay,
  formatDateHeader,
} from '@/components/widgets/CallsTable/model/functions';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';

interface CallsTableBodyProps {
  calls?: Array<GetListData>;
}

const CallsTableBody: FC<CallsTableBodyProps> = ({ calls }) => {
  const groupedCalls = groupCallsByDay(calls || []);
  const sortedDates = Object.keys(groupedCalls).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <TableBody className="text-[15px]">
      {sortedDates.map((date) => (
        <React.Fragment key={date}>
          {formatDateHeader(date) !== 'Сегодня' && (
            <TableRow className="border-t border-b border-[#EAF0FA] hover:bg-transparent">
              <TableCell
                colSpan={7}
                className="px-10 pt-10 pb-4 text-[#122945] font-medium"
              >
                {formatDateHeader(date)}
                <span className="ml-2 text-[#899CB1]">
                  {groupedCalls[date].length}
                </span>
              </TableCell>
            </TableRow>
          )}

          {groupedCalls[date].map((call, index) => (
            <TableRow
              className={cn(
                'py-2.5 hover:cursor-pointer hover:bg-[#D4DFF32B]',
                '[&>td]:w-fit [&>td]:h-fit [&>td]:px-0 [&>td]:py-3',
                '[&>td:first-child]:pl-10 [&>td:last-child]:pr-10'
              )}
              key={`${call.id}-${index}`}
            >
              <TableCell>
                <CallArrow
                  type={
                    call.in_out === 1
                      ? 'incoming'
                      : call.in_out === 0
                      ? 'outgoing'
                      : call.status === 'Не дозвонился'
                      ? 'notAnswered'
                      : 'missed'
                  }
                />
              </TableCell>
              <TableCell>{formatTime(call.date?.split(' ')?.[1])}</TableCell>
              <TableCell>
                <Avatar src={call.person_avatar} />
              </TableCell>
              <TableCell>
                <div>{call.partner_data.name}</div>
                <div className="text-gray-500">
                  {formatPhoneNumber(
                    call.partner_data.phone ||
                      call.from_number ||
                      call.to_number
                  )}
                </div>
              </TableCell>
              <TableCell className="text-[#5E7793]">{call.source}</TableCell>
              <TableCell>
                <Badge variant={getRandomVariant()} />
              </TableCell>
              <TableCell
                onClick={() => {
                  getRecord({
                    record: call.record,
                    partnership_id: call.partnership_id,
                  }).then((url) => {
                    console.log(url);
                  });
                  console.log(formatDuration(call.time));
                }}
                className="text-right"
              >
                {formatDuration(call.time)}
              </TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      ))}
    </TableBody>
  );
};

export default CallsTableBody;
