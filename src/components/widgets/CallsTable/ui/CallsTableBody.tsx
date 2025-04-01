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
} from '@/components/widgets/CallsTable/model/functions';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface CallsTableBodyProps {
  calls?: Array<GetListData>;
}

const CallsTableBody: FC<CallsTableBodyProps> = ({ calls }) => {
  return (
    <TableBody className="text-[15px]">
      {calls?.map((call, index) => (
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
                call.partner_data.phone || call.from_number || call.to_number
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
            {/* <AudioPlayer src={call.audio} /> */}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CallsTableBody;
