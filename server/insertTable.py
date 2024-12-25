import mysql.connector
import json

# Define the cities data
cities = [
    {
        "cityName": "Madrid",
        "country": "Spain",
        "emoji": "🇪🇸",
        "date": "2027-07-15T08:22:53.976Z",
        "notes": "",
        "position": {
            "lat": 40.46635901755316,
            "lng": -3.7133789062500004
        },
    },
    {
        "cityName": "Berlin",
        "country": "Germany",
        "emoji": "🇩🇪",
        "date": "2027-02-12T09:24:11.863Z",
        "notes": "Amazing 😃",
        "position": {
            "lat": 52.53586782505711,
            "lng": 13.376933665713324
        },
    },
    {
        "cityName": "Tokyo",
        "country": "Japan",
        "emoji": "🇯🇵",
        "date": "2027-05-20T12:45:30.000Z",
        "notes": "A bustling metropolis",
        "position": {
            "lat": 35.682839,
            "lng": 139.759455
        },
    },
    {
        "cityName": "Perth",
        "country": "Australia",
        "emoji": "🇦🇺",
        "date": "2027-12-21T09:00:00.000Z",
        "notes": "Beautiful beaches",
        "position": {
            "lat": -31.953512,
            "lng": 115.857048
        },
    },
    {
        "cityName": "London",
        "country": "United Kingdom of Great Britain and Northern Ireland (the)",
        "date": "2024-10-29T22:45:54.000Z",
        "notes": "rtrthfh",
        "emoji": "🇬🇧",
        "position": {
            "lat": 51.5564754566401,
            "lng": -0.3833198547363282
        }
    }
]

# Connect to the MySQL database
conn = mysql.connector.connect(
    host='srv776.hstgr.io',
    user='u104880580_yzel',
    password='Q1SS%em1jCkR@Y5c7c7S',
    database='u104880580_worldwise'
)

cursor = conn.cursor()

# Create the cities table if it doesn't exist

# Insert the cities data into the table
for city in cities:
    cursor.execute('''
    INSERT INTO cities (cityName, country, emoji, date, notes, lat, lng)
    VALUES  %s, %s, %s, %s, %s, %s, %s)
    ''', (
        city['cityName'],
        city['country'],
        city['emoji'],
        city['date'],
        city['notes'],
        city['position']['lat'],
        city['position']['lng']
    ))

# Commit the transaction
conn.commit()

# Close the connection
cursor.close()
conn.close()

print("Cities inserted successfully.")