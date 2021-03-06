'use strict'

const path = require('path')
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, '../../data/commentaries/cambridge.cmti')
const dbcamb = new sqlite3.Database(dbPath);


let currentCommentary;

const getBookCommentary = (commentary, book) => {
  return new Promise( (resolve, reject) => {
    const commentPath = path.resolve(__dirname, `../../data/commentaries/${commentary}.cmti`);    
    currentCommentary = new sqlite3.Database(commentPath);
    currentCommentary.all(`SELECT * FROM BookCommentary WHERE Book = ${book}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
} 

const getVerseCommentary = (commentary, book, chapter, verse) => {
  return new Promise( (resolve, reject) => {
    const commentPath = path.resolve(__dirname, `../../data/commentaries/${commentary}.cmti`);    
    currentCommentary = new sqlite3.Database(commentPath);
    currentCommentary.all(`SELECT rowid,* FROM VerseCommentary WHERE Book = ${book} AND ChapterBegin = ${chapter} AND ChapterEnd = ${chapter} AND VerseBegin <= ${verse} AND VerseEnd >= ${verse} UNION SELECT rowid,* FROM VerseCommentary WHERE Book = ${book} AND ChapterBegin = ${chapter} AND VerseBegin <= ${verse} AND ChapterBegin <> ChapterEnd UNION SELECT rowid,* FROM VerseCommentary WHERE Book = ${book} AND ChapterEnd = ${chapter} AND VerseEnd >= ${verse} AND ChapterBegin <> ChapterEnd UNION SELECT rowid,* FROM VerseCommentary WHERE Book = ${book} AND ChapterBegin < ${chapter} AND ChapterEnd > ${chapter} ORDER BY rowid`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
} 

const getTSKCommentary = (commentary, book, chapter, verse) => {
  return new Promise( (resolve, reject) => {
    const commentPath = path.resolve(__dirname, `../../data/commentaries/${commentary}.cmti`);    
    currentCommentary = new sqlite3.Database(commentPath);
    currentCommentary.all(`SELECT * FROM VerseCommentary WHERE Book = ${book} AND ChapterBegin = ${chapter} AND ChapterEnd = ${chapter} AND VerseBegin <= ${verse} AND VerseEnd >= ${verse}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
} 

module.exports = { getBookCommentary, getVerseCommentary, getTSKCommentary };