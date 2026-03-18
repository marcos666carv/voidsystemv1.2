import { useDragScroll } from '@/hooks/useDragScroll';

export type ReasonItem = {
    title: string;
    description: string;
    image: string;
};

interface Props {
    id: string;
    heading: string;
    items: ReasonItem[];
}

export function ReasonsCarousel({ id, heading, items }: Props) {
    const { ref } = useDragScroll<HTMLUListElement>();

    return (
        <section id={id} className="bg-[#e3e3d9] py-30">
            <div className="flex flex-col gap-18 md:gap-20">
                <div className="site-container">
                    <h2 className="font-sf-pro text-[32px] md:text-5xl lowercase text-[#082b3b]">
                        {heading}
                    </h2>
                </div>

                <ul
                    ref={ref}
                    className="flex gap-5 h-fit scrollbar-none overflow-y-hidden cursor-grab overflow-x-auto"
                >
                    {items.map((item) => (
                        <li
                            key={item.title}
                            className="first:pl-8 last:pr-8 xl:first:pl-30 xl:last:pr-30"
                        >
                            <div className="relative">
                                <img
                                    alt={item.title}
                                    loading="lazy"
                                    draggable={false}
                                    src={item.image}
                                    className="select-none min-w-[198px] min-h-[294px] md:min-w-[448px] md:h-[518px] bg-center object-cover rounded-3xl"
                                />
                                <div className="hidden md:block absolute -right-px top-12">
                                    <img
                                        alt=""
                                        src="/assets/svgs/card-border-wave.svg"
                                        width={48}
                                        height={213}
                                        className="select-none pointer-events-none"
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-1 py-4 px-8">
                                <h3 className="font-sf-pro text-[20px] md:text-[2rem] leading-6 lowercase text-[#082b3b]">
                                    {item.title}
                                </h3>
                                <p className="font-sf-pro text-xl leading-8 text-[#082b3b]">
                                    {item.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
