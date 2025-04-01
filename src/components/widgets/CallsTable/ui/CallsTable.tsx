import { useCallsStore } from '@/components/entities/calls';
import { getRecord } from '@/components/entities/calls/actions/getRecord';
import { createSelectors } from '@/components/shared/configs';
import CallArrow from '@/components/shared/icons/CallArrow';
import DateNavigationArrow from '@/components/shared/icons/DateNavigationArrow';
import FilterArrow from '@/components/shared/icons/FilterArrow';
import { AudioPlayer, Avatar, Badge } from '@/components/shared/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  formatPhoneNumber,
  getRandomVariant,
  formatDuration,
  formatTime,
} from '@/components/widgets/CallsTable/model/functions';
import { cn } from '@/lib/utils';
import { FC, JSX, useMemo } from 'react';

interface TableHead {
  title: string;
  hasArrow?: boolean;
  sortKey?: 'date' | 'duration';
}

const tableHeads: TableHead[] = [
  { title: 'Тип' },
  { title: 'Время', hasArrow: true, sortKey: 'date' },
  { title: 'Сотрудник' },
  { title: 'Звонок' },
  { title: 'Источник' },
  { title: 'Оценка' },
  { title: 'Длительность', hasArrow: true, sortKey: 'duration' },
];

const CallsTable: FC = (): JSX.Element => {
  const callsStore = createSelectors(useCallsStore);
  const calls = callsStore.use.calls();
  const filters = callsStore.use.filters();
  const updateFilter = callsStore.use.updateFilter();

  const handleSort = (sortKey?: string) => {
    if (!sortKey) return;

    if (filters.sort_by === sortKey) {
      const newOrder = filters.order === 'ASC' ? 'DESC' : 'ASC';
      updateFilter('order', newOrder);
    } else {
      updateFilter('sort_by', sortKey as 'date' | 'duration');
      updateFilter('order', 'ASC');
    }
  };

  const filteredCalls = useMemo(() => {
    return calls?.filter((call) => {
      if (filters.in_out?.length) {
        return Number(call.in_out) === Number(filters?.in_out);
      }

      return true;
    });
  }, [calls, filters]);

  return (
    <div
      className="select-none w-full max-w-[1440px] mx-auto bg-white rounded-xl mb-30"
      style={{ boxShadow: '0px 4px 5px 0px #e9edf3' }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeads.map((head, index) => (
              <TableHead
                className={cn(
                  'h-fit',
                  'text-secondary text-[14px]',
                  'px-0 pt-6 pb-5',
                  !index && 'pl-10',
                  index === tableHeads.length - 1 && 'pr-5 flex justify-end'
                )}
                key={`${head.title}-${index}`}
              >
                <div
                  className={cn(
                    'flex items-center gap-1 w-fit',
                    head.hasArrow && 'hover:cursor-pointer',
                    filters.sort_by === head.sortKey &&
                      'transition-all duration-300 text-[#005ff8]'
                  )}
                  onClick={() => head.sortKey && handleSort(head.sortKey)}
                >
                  {head.title}
                  {head.hasArrow && (
                    <div
                      className={cn(
                        'w-fit transition-all duration-300',
                        filters.sort_by === head.sortKey &&
                          filters.order === 'DESC'
                          ? ''
                          : 'rotate-180'
                      )}
                    >
                      <FilterArrow
                        width={18}
                        height={21}
                        className="flex items-center justify-center"
                        color={
                          filters.sort_by === head.sortKey
                            ? '#005ff8'
                            : '#ADBFDF'
                        }
                      />
                    </div>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="text-[15px]">
          {filteredCalls?.map((call, index) => (
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
                {/* <AudioPlayer src={call.audio} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CallsTable;
