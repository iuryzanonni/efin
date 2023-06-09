﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Database;
using API.DTOs;
using API.Models;
using API.Models.TimeWork;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TimeWorkController : ControllerBase
	{
		private readonly ApplicationDBContext _contextEF;
		private readonly IMapper _mapper;
		public TimeWorkController(ApplicationDBContext context, IMapper mapper)
		{
			_mapper = mapper;
			_contextEF = context;
		}

		[HttpGet]
		[Route("")]
		[AllowAnonymous]
		public ActionResult<IEnumerable<TimeWork>> GetMonthTimes()
		{
			var results = _contextEF.TimeWork.Where(t => t.DateDay.Month == 12 && t.User.id == 4).ToList();
			return results;
		}
		
		[HttpGet]
		[Route("getTimeWork", Name = "getTimeWork")]
		[Authorize(Roles = "owner,manage,user")]
		public ActionResult<TimeWorkDTO> GetTimeWork([FromBody]string dateDay)
		{
			string username = User.Identity.Name;
			User user = new User(_contextEF);
			user = user.GetUserWhitName(username);
			DateTime date = DateTime.Parse(dateDay, CultureInfo.CreateSpecificCulture("pt-BR"));

			TimeWork timeWork = _contextEF.TimeWork.FirstOrDefault(tw => tw.DateDay == date && tw.User.id == user.id);
			TimeWorkDTO timeWorkDTO = _mapper.Map<TimeWorkDTO>(timeWork);

			return timeWorkDTO;
		}

		[HttpGet]
		[Route("getTimeWorkPeriod")]
		[Authorize(Roles = "owner,manage,user")]
		//[AllowAnonymous]
		public ActionResult<IEnumerable<TimeWorkDTO>> GetTimeWorkPeriod(DateTime start, DateTime end)
        {
			string username = User.Identity.Name;
			User user = new User(_contextEF);
			user = user.GetUserWhitName(username);

			var timeWork = _contextEF.TimeWork.Where(tw => tw.DateDay >= start && tw.DateDay <= end && tw.User.id == user.id).ToList();
			List<TimeWorkDTO> results = _mapper.Map<List<TimeWorkDTO>>(timeWork);
			return results;
		}


		[HttpPost]
		[Route("insertDate")]
		[Authorize(Roles = "owner,manage,user")]
		public ActionResult CreateDate([FromBody]string dateDay)
		{
			string username = User.Identity.Name;
			User user = new User(_contextEF);
			user = user.GetUserWhitName(username);
			DateTime date = DateTime.Parse(dateDay, CultureInfo.CreateSpecificCulture("pt-BR"));

			TimeWork timeWork = new TimeWork(date, user);
			_contextEF.TimeWork.Add(timeWork);
			_contextEF.SaveChanges();
			TimeWorkDTO timeWorkDTO = _mapper.Map<TimeWorkDTO>(timeWork);

			return Created("Day Successfully Saved.", timeWorkDTO);
		}

		[HttpPut]
		[Route("alterDate/{dateday}")]
		[Authorize(Roles = "owner,manage,user")]
		public ActionResult AlterDate(DateTime dateday, [FromBody] TimeWork timeWork)
        {
			if(dateday != timeWork.DateDay)
            {
				return BadRequest();
            }
			_contextEF.Entry(timeWork).State = EntityState.Modified;
			_contextEF.SaveChanges();

			return Ok();

        }

	}
}
