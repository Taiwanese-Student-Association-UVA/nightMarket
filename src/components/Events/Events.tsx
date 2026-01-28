import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import styles from './Events.module.css';
import SkyBackground from './SkyBackground';
import defaultEventImage from '../../assets/logo.png';
import noEventHeader from '../../assets/lanterns-9831440_1920.jpg';
import { FaInstagram } from 'react-icons/fa';

const InstagramIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = FaInstagram as any;
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    description: string;
    imageUrl?: string;
    instagramLink?: string;
    prCredit?: string;
}

const GOOGLE_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQe3K5xq858FpFjKYjA1-FTYpjvw6LsUzrPw93aQUp023vIPDtIxbKrquLIR0BnOrSYZ1XJzEXdl_3s/pub?output=csv";

const SkeletonCard: React.FC = () => (
    <div className={`${styles.eventCard} ${styles.skeletonCard}`}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
    </div>
);

const EventCard: React.FC<{ event: Event; past?: boolean; delay?: number }> = ({ event, past = false, delay = 0 }) => {
    return (
        <div
            className={`${styles.eventCard} ${past ? styles.pastEvent : ''} ${styles.fadeIn}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <img
                src={`/EventsImages/${event.id}.jpg` || defaultEventImage}
                alt={event.title}
                className={styles.eventImage}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultEventImage;
                }}
            />
            <div className={styles.eventDetails}>
                <h2>{event.title}</h2>
                <h3 className={styles.eventDateTime}>{event.time}</h3>
                <h3 className={styles.eventDate}>{event.date}</h3>
                <h3 className={styles.eventDescription}>
                    {event.description.length > 350
                        ? event.description.slice(0, 350) + "..."
                        : event.description}
                </h3>

                <div style={{ marginTop: "auto" }}>
                    <div className={styles.eventDivider}></div>

                    <div className={styles.eventFooter}>
                        {event.instagramLink ? (
                            <a
                                href={event.instagramLink.trim()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.instagramButton}
                            >
                                <InstagramIcon size={24} />
                            </a>
                        ) : (
                            <button className={styles.instagramButton} disabled>
                                <InstagramIcon size={24} style={{ opacity: 0.3 }} />
                            </button>
                        )}

                        {event.prCredit && (
                            <span className={styles.prCredit}>Credit: {event.prCredit}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventsPage: React.FC = () => {
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Papa.parse(GOOGLE_SHEET_URL, {
            download: true,
            header: true,
            complete: (results: { data: Event[] }) => {
                const events = results.data as Event[];
                const today = dayjs();

                const current = events.filter(e =>
                    dayjs(e.date, 'MM/DD/YYYY').isSameOrAfter(today, 'day')
                );

                const past = events.filter(e =>
                    dayjs(e.date, 'MM/DD/YYYY').isBefore(today, 'day')
                );

                setCurrentEvents(current);
                setPastEvents(past);
                setLoading(false);
            },
            error: (err) => {
                console.error("Error fetching CSV:", err);
                setLoading(false);
            }
        });
    }, []);

    return (
        <>
            <SkyBackground />
            <div className={styles.eventsContainer}>

                {/* Header */}
                <div className={styles.eventsHeader}>
                    <h1 className={styles.eventsTitle}>Events</h1>
                    <div className={styles.divider}></div>
                </div>

                {/* Current Events */}
                <div className={styles.eventsGrid}>
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                        : currentEvents.length > 0
                            ? currentEvents.map((event, index) => (
                                <EventCard key={event.id + '-current'} event={event} delay={index * 150} />
                            ))
                            : (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyImage}></div>

                                    <div className={styles.emptyOverlay}>
                                        <h3>No Current Events</h3>
                                        <p>Check back soon for more upcoming events!</p>
                                    </div>
                                </div>

                            )
                    }
                </div>

                {/* Past Events Header */}
                <div className={styles.pastEventsHeader}>
                    <h2 className={styles.pastEventsTitle}>Past Events</h2>
                    <div className={styles.pastDivider}></div>
                </div>

                {/* Past Events */}
                <div className={styles.eventsGrid}>
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                        : pastEvents.length > 0
                            ? pastEvents.map((event, index) => (
                                <EventCard key={event.id + '-past'} event={event} past delay={index * 150} />
                            ))
                            : <p>No past events found.</p>
                    }
                </div>

            </div>
        </>
    );
};

export default EventsPage;
